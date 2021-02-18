import hash from 'object-hash';

function a() {
    const a = {};
    const b = {};
    
    const ha = hash(a);
    const hb = hash(b);
    
    console.log(`ha ${ha} hb ${hb} equal ${ha===hb}`);
}

function b() {
    const a = {a: 1, b: 2, c : {a:1, b:2, c:3}};
    const b = {a: 1, b: 2, c : {b:2, a:1, c:3}};
    
    const ha = hash(a);
    const hb = hash(b);
    
    console.log(`ha ${ha} hb ${hb} equal ${ha===hb}`);
}

b();