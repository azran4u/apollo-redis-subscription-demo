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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedaersWithBooksAndAuthorsInTimeFrame = void 0;
const injector_1 = require("../../utils/injector");
const utils_1 = require("../../utils");
const connection_1 = require("../connection");
function getRedaersWithBooksAndAuthorsInTimeFrame(range) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = injector_1.Injector.getInstance()
            .getService(connection_1.Database)
            .getClient();
        const queryText = `
        -- readers with book_id, book_title and author_id, author_name
        select reader_name, title as book_title, name as author_name
        from (
            
            -- readers with book_id, book_title and author_id
            select *
            from (
                
                -- readers with book_id and book_title
                select *
                from (
        
                    -- readers with book_id
                    select *
                    from (
                        
                            -- readers in time range
                            select name as reader_name, id as reader_id
                            from schema1.reader as r 
                            where r.when_read >= $1 AND r.when_read <  $2
        
                        ) as readersinrange 
        
                    left join schema1.reader_book on (schema1.reader_book.reader_id = readersinrange.reader_id)
        
                    
                ) as readersandbooks
                inner join schema1.book on (schema1.book.id = readersandbooks.book_id)
        
        
            ) as readersbookdata
            left join schema1.book_author on (schema1.book_author.book_id = readersbookdata.book_id)
        
        ) as readersbooksauthorid
        left join schema1.author on (schema1.author.id = readersbooksauthorid.author_id)
        order by reader_name, book_title, author_name
      `;
        const vars = [range.from.toISOString(), range.to.toISOString()];
        try {
            const res = yield client.query(queryText, vars);
            return res.rows.map((row) => {
                var _a, _b, _c;
                return {
                    author_name: (_a = row.author_name) !== null && _a !== void 0 ? _a : 'DOES NOT EXISTS',
                    book_title: (_b = row.book_title) !== null && _b !== void 0 ? _b : 'DOES NOT EXISTS',
                    reader_name: (_c = row.reader_name) !== null && _c !== void 0 ? _c : 'DOES NOT EXISTS',
                };
            });
        }
        catch (error) {
            utils_1.logger.error(`getRedaersWithBooksAndAuthorsInTimeFrame failed ${error}`);
            throw error;
        }
    });
}
exports.getRedaersWithBooksAndAuthorsInTimeFrame = getRedaersWithBooksAndAuthorsInTimeFrame;
//# sourceMappingURL=getRedaersWithBooksAndAuthorsInTimeFrame.js.map