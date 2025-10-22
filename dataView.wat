(module
  (memory (export "memory") 1)
  (func (export "size") (result i32) (memory.size))
  (func (export "load8") (param i32) (result i32) (i32.load8_u (local.get 0)))
  (func (export "load16") (param i32) (result i32) (i32.load16_u (local.get 0)))

  (data (i32.const 0x0ffe) "\09\00\94\03\b5\03\b4\03\bf\03\bc\03\ad\03\bd\03\c9\03\bd\03")
)
