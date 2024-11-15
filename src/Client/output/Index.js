import { Union, Record } from "./fable_modules/fable-library-js.4.19.3/Types.js";
import { TodoModule_isValid, TodoModule_create, ITodosApi_$reflection, Todo_$reflection } from "./Shared/Shared.js";
import { union_type, unit_type, record_type, string_type, list_type } from "./fable_modules/fable-library-js.4.19.3/Reflection.js";
import { RemoteData_map, ApiCall$2, RemoteData$1, ApiCall$2_$reflection, RemoteData$1_$reflection } from "./fable_modules/SAFE.Client.5.0.5/SAFE.fs.js";
import { printf, toText } from "./fable_modules/fable-library-js.4.19.3/String.js";
import { Remoting_buildProxy_64DC51C } from "./fable_modules/Fable.Remoting.Client.7.32.0/Remoting.fs.js";
import { RemotingModule_createApi, RemotingModule_withRouteBuilder } from "./fable_modules/Fable.Remoting.Client.7.32.0/Remoting.fs.js";
import { createObj, uncurry2 } from "./fable_modules/fable-library-js.4.19.3/Util.js";
import { ofArray, append, singleton } from "./fable_modules/fable-library-js.4.19.3/List.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.2.0/cmd.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./fable_modules/Fable.Elmish.4.2.0/cmd.fs.js";
import { createElement } from "react";
import { reactApi } from "./fable_modules/Feliz.2.8.0/Interop.fs.js";
import { map, singleton as singleton_1, delay, toList } from "./fable_modules/fable-library-js.4.19.3/Seq.js";

export class Model extends Record {
    constructor(Todos, Input) {
        super();
        this.Todos = Todos;
        this.Input = Input;
    }
}

export function Model_$reflection() {
    return record_type("Index.Model", [], Model, () => [["Todos", RemoteData$1_$reflection(list_type(Todo_$reflection()))], ["Input", string_type]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SetInput", "LoadTodos", "SaveTodo"];
    }
}

export function Msg_$reflection() {
    return union_type("Index.Msg", [], Msg, () => [[["Item", string_type]], [["Item", ApiCall$2_$reflection(unit_type, list_type(Todo_$reflection()))]], [["Item", ApiCall$2_$reflection(string_type, Todo_$reflection())]]]);
}

export const todosApi = (() => {
    let routeBuilder_1;
    const clo = toText(printf("/api/%s/%s"));
    routeBuilder_1 = ((arg) => {
        const clo_1 = clo(arg);
        return clo_1;
    });
    const customOptions_1 = (x) => x;
    return Remoting_buildProxy_64DC51C(customOptions_1(RemotingModule_withRouteBuilder(uncurry2(routeBuilder_1), RemotingModule_createApi())), ITodosApi_$reflection());
})();

export function init() {
    const initialModel = new Model(new RemoteData$1(0, []), "");
    const initialCmd = singleton((dispatch) => {
        dispatch(new Msg(1, [new ApiCall$2(0, [undefined])]));
    });
    return [initialModel, initialCmd];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const msg_1 = msg.fields[0];
            if (msg_1.tag === 1) {
                const todos = msg_1.fields[0];
                return [new Model(new RemoteData$1(2, [todos]), model.Input), Cmd_none()];
            }
            else {
                const loadTodosCmd = Cmd_OfAsyncWith_perform((x) => {
                    Cmd_OfAsync_start(x);
                }, todosApi.getTodos, undefined, (arg) => (new Msg(1, [new ApiCall$2(1, [arg])])));
                return [new Model(new RemoteData$1(1, []), model.Input), loadTodosCmd];
            }
        }
        case 2: {
            const msg_2 = msg.fields[0];
            if (msg_2.tag === 1) {
                const todo_1 = msg_2.fields[0];
                return [new Model(RemoteData_map((todos_1) => append(todos_1, singleton(todo_1)), model.Todos), model.Input), Cmd_none()];
            }
            else {
                const todoText = msg_2.fields[0];
                let saveTodoCmd;
                const todo = TodoModule_create(todoText);
                saveTodoCmd = Cmd_OfAsyncWith_perform((x_1) => {
                    Cmd_OfAsync_start(x_1);
                }, todosApi.addTodo, todo, (arg_2) => (new Msg(2, [new ApiCall$2(1, [arg_2])])));
                return [new Model(model.Todos, ""), saveTodoCmd];
            }
        }
        default: {
            const value = msg.fields[0];
            return [new Model(model.Todos, value), Cmd_none()];
        }
    }
}

export function ViewComponents_todoAction(model, dispatch) {
    let elems, value_2, value_12;
    return createElement("div", createObj(ofArray([["className", "flex flex-col sm:flex-row mt-4 gap-4"], (elems = [createElement("input", createObj(ofArray([(value_2 = "shadow appearance-none border rounded w-full py-2 px-3 outline-none focus:ring-2 ring-teal-300 text-grey-darker", ["className", value_2]), ["value", model.Input], ["placeholder", "What needs to be done?"], ["autoFocus", true], ["onChange", (ev) => {
        dispatch(new Msg(0, [ev.target.value]));
    }], ["onKeyPress", (ev_1) => {
        if (ev_1.key === "Enter") {
            dispatch(new Msg(2, [new ApiCall$2(0, [model.Input])]));
        }
    }]]))), createElement("button", createObj(ofArray([(value_12 = "flex-no-shrink p-2 px-12 rounded bg-teal-600 outline-none focus:ring-2 ring-teal-300 font-bold text-white hover:bg-teal disabled:opacity-30 disabled:cursor-not-allowed", ["className", value_12]), ["disabled", !TodoModule_isValid(model.Input)], ["onClick", (_arg) => {
        dispatch(new Msg(2, [new ApiCall$2(0, [model.Input])]));
    }], ["children", "Add"]])))], ["children", reactApi.Children.toArray(Array.from(elems))])])));
}

export function ViewComponents_todoList(model, dispatch) {
    let elems_1, elems;
    return createElement("div", createObj(ofArray([["className", "bg-white/80 rounded-md shadow-md p-4 w-5/6 lg:w-3/4 lg:max-w-2xl"], (elems_1 = [createElement("ol", createObj(ofArray([["className", "list-decimal ml-6"], (elems = toList(delay(() => {
        const matchValue = model.Todos;
        switch (matchValue.tag) {
            case 1:
                return singleton_1("Loading...");
            case 2: {
                const todos = matchValue.fields[0];
                return map((todo) => createElement("li", {
                    className: "my-1",
                    children: todo.Description,
                }), todos);
            }
            default:
                return singleton_1("Not Started.");
        }
    })), ["children", reactApi.Children.toArray(Array.from(elems))])]))), ViewComponents_todoAction(model, dispatch)], ["children", reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function view(model, dispatch) {
    let elems_2, elems, elems_1;
    return createElement("section", createObj(ofArray([["className", "h-screen w-screen"], ["style", {
        backgroundSize: "cover",
        backgroundImage: "url(\'https://unsplash.it/1200/900?random\')",
        backgroundPosition: "no-repeat center center fixed",
    }], (elems_2 = [createElement("a", createObj(ofArray([["href", "https://safe-stack.github.io/"], ["className", "absolute block ml-12 h-12 w-12 bg-teal-300 hover:cursor-pointer hover:bg-teal-400"], (elems = [createElement("img", {
        src: "/favicon.png",
        alt: "Logo",
    })], ["children", reactApi.Children.toArray(Array.from(elems))])]))), createElement("div", createObj(ofArray([["className", "flex flex-col items-center justify-center h-full"], (elems_1 = [createElement("h1", {
        className: "text-center text-5xl font-bold text-white mb-3 rounded-md p-4",
        children: "SafeRent",
    }), ViewComponents_todoList(model, dispatch)], ["children", reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", reactApi.Children.toArray(Array.from(elems_2))])])));
}

//# sourceMappingURL=Index.js.map
