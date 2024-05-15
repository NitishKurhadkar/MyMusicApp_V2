import { NextResponse } from "next/server";

export async function POST(request: Request){
    let pathUrl: any = request && request.url;
    let headers = new Headers();
    console.log(request, pathUrl, "pathUrlpathUrl")
    const req = await request.json()
    console.log(req,pathUrl,"https://my-music-app-server-6yia.vercel.app/uploadSong","reqreq")
    const _res = fetch("https://my-music-app-server-6yia.vercel.app/uploadSong",{
        cache :'no-store',
        method : "POST",
        body : req
    })
    return _res
}