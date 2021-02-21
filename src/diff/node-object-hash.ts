import hasher from 'node-object-hash';

const hashSortCoerce = hasher({ sort: true, coerce: true });

export function hashObject(object: Object): string {
  return hashSortCoerce.hash(object);
}

// function a() {
//   const a = {};
//   const b = {};

//   const ha = hashSortCoerce.hash(a);
//   const hb = hashSortCoerce.hash(b);

//   console.log(`ha ${ha} \nhb ${hb} \nequal ${ha === hb}`);
// }

// function b() {
//   const a = { a: 1, b: 2, c: { a: 1, b: 2, c: 3 } };
//   const b = { a: 1, b: 2, c: { b: 2, a: 1, c: 3 } };

//   const ha = hashSortCoerce.hash(a);
//   const hb = hashSortCoerce.hash(b);

//   console.log(`ha ${ha} \nhb ${hb} \nequal ${ha === hb}`);
// }

// a();
// b();
