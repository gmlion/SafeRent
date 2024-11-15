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
    let s : Printf.StringFormat<string -> int -> string -> string> = "%s %i %s"
    let greet = sprintf s "Say hello" 1000 "times"

    let routing =
        choose [
            route "/start"
                >=> text "Hello"
            routef "/end/%s" (fun s ->
                text (sprintf "%s" s))

        ]

    routing

    (*
    subRoutef "/%s" (fun root ->
        routef "/%s/%i" (fun (s, i) -> text (sprintf "Root: %s. Second level: %s. Version: %i\n%s" root s i greet))
        )
        *)



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