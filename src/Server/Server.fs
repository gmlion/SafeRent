module Server

open System
open SAFE
open Giraffe
open Saturn
open Shared

module Storage =
    let todos =
        ResizeArray [
            Todo.create "Create new SAFE project"
            Todo.create "Write your app"
            Todo.create "Ship it!!!"
        ]

    let addTodo todo =
        if Todo.isValid todo.Description then
            todos.Add todo
            Ok()
        else
            Error "Invalid todo"

let todosApi ctx = {
    getTodos = fun () -> async { return Storage.todos |> List.ofSeq }
    addTodo =
        fun todo -> async {
            return
                match Storage.addTodo todo with
                | Ok() -> todo
                | Error e -> failwith e
        }
}

let webApp = //Api.make todosApi
    let s : Printf.StringFormat<string -> int -> string> = "%s%d"
    sprintf $ s "ciao" 1
    subRoutef
    routef "/%s/%d" (fun n -> text (sprintf "Hello %s! Lang: %s" n "lang"))

let app = application {
    use_router webApp
    memory_cache
    use_static "public"
    use_gzip
}

[<EntryPoint>]
let main _ =
    run app
    0