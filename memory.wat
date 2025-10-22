(module
  (memory (export "memory") 2 3)

  (func (export "size") (result i32) (memory.size))
  (func (export "load") (param i32) (result i32) (i32.load8_s (local.get 0)))
  (func (export "store") (param i32 i32)
    (i32.store8 (local.get 0) (local.get 1))
  )
  (func (export "stringput") (param i32 i32)
    (local $charaddr i32)
    (local.set $charaddr
      (i32.add
        (local.get 0)
        (i32.const 0x1000)))
    (i32.store8 (local.get $charaddr) (local.get 1))
  )
  (func (export "stringget") (param i32) (result i32)
    (local $charaddr i32)
    (local.set $charaddr
      (i32.add
        (local.get 0)
        (i32.const 0x1000)))
    (i32.load8_s (local.get $charaddr))
  )
  (func (export "stringsizeput") (param i32) (i32.store8 (i32.const 0x0fff) (local.get 0)))
  (func (export "stringsizeget") (param i32) (result i32) (i32.load8_s (i32.const 0x0fff)))

  (data (i32.const 0x0fff) "\06\46\6F\75\72\43\43")
)
