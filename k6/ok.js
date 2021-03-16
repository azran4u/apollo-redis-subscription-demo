import http from 'k6/http';
import { sleep, check, group, randomSeed } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  discardResponseBodies: true,
  minIterationDuration: '10s',
  thresholds: {
    http_req_duration: ['avg<40'], // ms
    errors: ['rate<0.1'], // <10% errors
  },
  scenarios: {
    // ok: {
    //   executor: 'constant-vus',
    //   exec: 'ok',
    //   vus: 50,
    //   duration: '30s',
    // },
    // ok: {
    //   executor: 'per-vu-iterations',
    //   exec: 'ok',
    //   vus: 50,
    //   iterations: 10,
    //   maxDuration: '60s',
    // },
    ok: {
      executor: 'shared-iterations',
      exec: 'ok',
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    },
    getAllUsers: {
      executor: 'shared-iterations',
      exec: 'getAllUsers',
      vus: 10,
      iterations: 20,
      maxDuration: '10s',
    },
    usersAPI: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '10s',
    },
  },
};

//

export default function () {
  group('users API', function () {
    group('getAllUsers', function () {
      let query = `
        query q1 {
          getAllUsers{
            id
            name
          }
        }`;

      let headers = {
        'Content-Type': 'application/json',
      };

      let res = http.post(
        'http://localhost:4000/graphql',
        JSON.stringify({ query: query }),
        { headers: headers },
      );

      check(res, {
        'status is 200': (r) => r.status == 200,
      });

      errorRate.add(res.error_code);
    });

    group('addUser', function () {
      randomSeed(123456789);
      let rnd = Math.random();
      let query = `
        mutation m1 {
          addUser(name: "name${rnd}"){
            id
            name
          }
        }`;

      let headers = {
        'Content-Type': 'application/json',
      };

      let res = http.post(
        'http://localhost:4000/graphql',
        JSON.stringify({ query: query }),
        { headers: headers },
      );

      check(res, {
        'status is 200': (r) => r.status == 200,
      });

      errorRate.add(res.error_code);
    });
  });
  sleep(1);
}

export function ok() {
  const res = http.get('http://localhost:4000/ok');

  const result = check(res, {
    'status is 200': (r) => r.status == 200,
  });
  errorRate.add(!result);

  // sleep(1);
}

export function getAllUsers() {
  let query = `
  query q1 {
    getAllUsers{
      id
      name
    }
  }`;

  let headers = {
    'Content-Type': 'application/json',
  };

  let res = http.post(
    'http://localhost:4000/graphql',
    JSON.stringify({ query: query }),
    { headers: headers },
  );

  const result = check(res, {
    'status is 200': (r) => r.status == 200,
  });

  errorRate.add(res.error_code);
}
