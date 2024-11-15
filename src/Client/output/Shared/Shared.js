import { Record } from "../fable_modules/fable-library-js.4.19.3/Types.js";
import { lambda_type, list_type, unit_type, record_type, string_type, class_type } from "../fable_modules/fable-library-js.4.19.3/Reflection.js";
import { isNullOrWhiteSpace } from "../fable_modules/fable-library-js.4.19.3/String.js";
import { newGuid } from "../fable_modules/fable-library-js.4.19.3/Guid.js";

export class Todo extends Record {
    constructor(Id, Description) {
        super();
        this.Id = Id;
        this.Description = Description;
    }
}

export function Todo_$reflection() {
    return record_type("Shared.Todo", [], Todo, () => [["Id", class_type("System.Guid")], ["Description", string_type]]);
}

export function TodoModule_isValid(description) {
    return !isNullOrWhiteSpace(description);
}

export function TodoModule_create(description) {
    return new Todo(newGuid(), description);
}

export class ITodosApi extends Record {
    constructor(getTodos, addTodo) {
        super();
        this.getTodos = getTodos;
        this.addTodo = addTodo;
    }
}

export function ITodosApi_$reflection() {
    return record_type("Shared.ITodosApi", [], ITodosApi, () => [["getTodos", lambda_type(unit_type, class_type("Microsoft.FSharp.Control.FSharpAsync`1", [list_type(Todo_$reflection())]))], ["addTodo", lambda_type(Todo_$reflection(), class_type("Microsoft.FSharp.Control.FSharpAsync`1", [Todo_$reflection()]))]]);
}

//# sourceMappingURL=Shared.js.map
