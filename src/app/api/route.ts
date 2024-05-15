import { NextResponse } from "next/server";

export async function POST(request: Request){
    let pathUrl: any = request && request.url;
    let headers = new Headers();
    const req = await request.json()
    console.log(req,pathUrl,"reqreq")
    const _res = fetch(pathUrl,{
        cache :'no-store',
        method : "POST",
        body : req
    })
    return _res
}