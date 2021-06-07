"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsNotify = exports.tableChangedNotification = exports.removeTriggerIfExists = exports.createTrigger = exports.createTriggerFunction = void 0;
const pg_1 = require("pg");
const utils_1 = require("../../utils");
const counter_controller_1 = require("../../entities/counter/controller/counter.controller");
const pubsub_1 = __importDefault(require("../../entities/counter/resolvers/pubsub"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const subscription_events_1 = require("../../entities/counter/resolvers/subscription.events");
const connection_1 = require("../connection");
function createTriggerFunction(schema, table) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = utils_1.Injector.getInstance()
            .getService(connection_1.Database)
            .getClient();
        const name = `${schema}.${table}`;
        const queryText = `
        create or replace function ${name}_notify()
        returns trigger
        language plpgsql as 
          $function$
            begin
              perform pg_notify('${name}_changed', '');
              return NULL;
            end;
          $function$
      `;
        try {
            yield client.query(queryText);
        }
        catch (error) {
            utils_1.logger.error(`createTriggerFunction failed ${error}`);
            throw error;
        }
    });
}
exports.createTriggerFunction = createTriggerFunction;
// returns the created trigger name
function createTrigger(schema, table) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = utils_1.Injector.getInstance()
            .getService(connection_1.Database)
            .getClient();
        const triggerName = `${schema}_${table}_changed_trigger`;
        const name = `${schema}.${table}`;
        const queryText = `
        create trigger ${triggerName} after insert or update or delete on ${name} 
        for each row execute procedure ${name}_notify();
      `;
        try {
            yield client.query(queryText);
            return triggerName;
        }
        catch (error) {
            utils_1.logger.error(`createTrigger failed ${queryText} ${error}`);
            throw error;
        }
    });
}
exports.createTrigger = createTrigger;
function removeTriggerIfExists(schema, table) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = utils_1.Injector.getInstance()
            .getService(connection_1.Database)
            .getClient();
        const name = `${schema}.${table}`;
        const queryText = `
        drop trigger if exists ${schema}_${table}_changed_trigger on ${name};
      `;
        try {
            yield client.query(queryText);
        }
        catch (error) {
            utils_1.logger.error(`removeTrigger failed ${error}`);
            throw error;
        }
    });
}
exports.removeTriggerIfExists = removeTriggerIfExists;
function tableChangedNotification(schema, table) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = utils_1.Injector.getInstance()
            .getService(connection_1.Database)
            .getClient();
        const triggerName = `${schema}_${table}_changed_trigger`;
        try {
            yield client.query(`LISTEN ${triggerName}`);
        }
        catch (error) {
            utils_1.logger.error(`failed listening to trigger ${triggerName}`);
        }
        return new rxjs_1.Observable((subscriber) => {
            client.on('notification', (msg) => __awaiter(this, void 0, void 0, function* () {
                const data = msg.payload;
                const channel = msg.channel;
                const processId = msg.processId;
                subscriber.next();
            }));
        });
    });
}
exports.tableChangedNotification = tableChangedNotification;
function dbTriggerRegistration() {
    return __awaiter(this, void 0, void 0, function* () {
        const azurePrimaryDbConfig = {
            user: 'eyala@live-query-poc',
            host: 'live-query-poc.postgres.database.azure.com' ||
                process.env.DATABASE_HOST,
            database: 'live_query_poc',
            password: 'aA123456',
            port: 5432 || Number.parseInt(process.env.DATABASE_PORT),
        };
        const azureReplica1DbConfig = {
            user: 'eyala@live-query-poc',
            host: 'live-query-poc-replica-1.postgres.database.azure.com' ||
                process.env.DATABASE_HOST,
            database: 'live_query_poc',
            password: 'aA123456',
            port: 5432 || Number.parseInt(process.env.DATABASE_PORT),
        };
        const localhostDbConfig = {
            user: 'postgresadmin',
            host: '127.0.0.1' || process.env.DATABASE_HOST,
            database: 'postgresdb',
            password: 'admin123',
            port: 5432 || Number.parseInt(process.env.DATABASE_PORT),
        };
        const dbConfig = process.env.DB_NAME === 'PRIMARY'
            ? azurePrimaryDbConfig
            : azureReplica1DbConfig;
        utils_1.logger.info(`db config = ${JSON.stringify(dbConfig, null, 4)}`);
        const pgClient = new pg_1.Client(dbConfig);
        yield pgClient.connect();
        utils_1.logger.info('connected to db');
        yield pgClient.query('LISTEN books_table_insert');
        return new rxjs_1.Observable((subscriber) => {
            pgClient.on('notification', (msg) => __awaiter(this, void 0, void 0, function* () {
                const data = msg.payload;
                const channel = msg.channel;
                const processId = msg.processId;
                utils_1.logger.info(`data = ${data} channel = ${channel} processId = ${processId}`);
                const res = yield counter_controller_1.counterController.getCounter();
                utils_1.logger.info(`counter = ${res}`);
                subscriber.next(res);
            }));
        });
    });
}
function wsNotify() {
    return __awaiter(this, void 0, void 0, function* () {
        dbTriggerRegistration().then((observable) => {
            observable
                .pipe(operators_1.debounceTime(1000), operators_1.tap((res) => {
                pubsub_1.default.publish(subscription_events_1.COUNTER_CHNAGED, { counterChanged: res });
            }))
                .subscribe();
            utils_1.logger.info(`litening to database triggers...`);
        }, (err) => {
            utils_1.logger.error(`dbTriggerRegistration error ${err}`);
        });
    });
}
exports.wsNotify = wsNotify;
//# sourceMappingURL=trigger.js.map