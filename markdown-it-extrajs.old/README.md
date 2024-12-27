# MarkdownIt Extra JS Plugin

## Project Status

This project was originally developed using Deno. However, I have decided to discontinue the Deno version and will be continuing development using Node.js moving forward.

You can find the new Node.js version of the project here: [New Node.js Project](https://github.com/morish000/markdown-it-extrajs/tree/main/markdown-it-extrajs)

Reason:
I was unable to resolve the following error:

```
Publishing @morish000/markdown-it-extrajs@0.0.23 ...
error: Failed to publish @morish000/markdown-it-extrajs@0.0.23

Caused by:
    Failed to publish @morish000/markdown-it-extrajs at 0.0.23: failed to generate documentation: Failed resolving 'npm:markdown-it@14.1.x' from 'file:///src/block-tag-plugin.ts'.
    
    Stack backtrace:
       0: anyhow::error::<impl core::convert::From<E> for anyhow::Error>::from
       1: registry_api::docs::generate_docs::{{closure}}
       2: registry_api::docs::generate_docs
       3: registry_api::analysis::analyze_package_inner::{{closure}}::{{closure}}
       4: <tracing::instrument::Instrumented<T> as core::future::future::Future>::poll
       5: registry_api::analysis::analyze_package::{{closure}}
       6: tokio::runtime::runtime::Runtime::block_on
       7: registry_api::analysis::analyze_package
       8: tokio::runtime::task::core::Core<T,S>::poll
       9: tokio::runtime::task::harness::Harness<T,S>::poll
      10: tokio::runtime::blocking::pool::Inner::run
      11: std::sys::backtrace::__rust_begin_short_backtrace
      12: core::ops::function::FnOnce::call_once{{vtable.shim}}
      13: std::sys::pal::unix::thread::Thread::new::thread_start
      14: <unknown>
      15: <unknown>
```
