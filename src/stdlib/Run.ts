import * as brs from "../";
import { BrsType, ValueKind, Callable, Int32, BrsString, BrsInvalid } from "../brsTypes";
import * as Expr from "../parser/Expression";
import { Interpreter } from "../interpreter";

export const Run = new Callable(
    "Run",
    {
        signature: {
            args: [
                {
                    name: "filename",
                    type: ValueKind.String
                },
                {
                    name: "arg0",
                    type: ValueKind.Dynamic,
                    defaultValue: new Expr.Literal(BrsInvalid.Instance)
                }
            ],
            returns: ValueKind.String
        },
        impl: (interpreter: Interpreter, filename: BrsString, ...args: BrsType[]) => {
            // TODO: make this work with pkg:/ URLs
            let results = brs.executeSync([ filename.value ], interpreter.options);
            return results[0] || BrsInvalid.Instance;
        }
    }
);
