import React, { useEffect, useRef, useState } from 'react'
import io, { Socket } from "socket.io-client"
import axios from "axios"
const socket = io.connect("http://localhost:3001")

const Login = () => {

    const [text, settext] = useState("")
    const [room, setroom] = useState("")
    const [roomlogin, setroomLogin] = useState("")
    const [listRoom, setlistRoom] = useState([])
    const [listmess, setListMess] = useState([])


    const joinRoom = () => {
        socket.emit("join_room", { UserId1: "abc", UserId2: "def" })
    }
    const handleLogin = () => {
        socket.emit("send_mess", { text: text, room: room, userId: "123123" })
    }

    useEffect(() => {
        socket.on("success_Room", (data) => {
            console.log(data, 1)
            setlistRoom(prev => [...prev, data])
        })
        socket.on("server_return_mess", (data) => {
            setListMess(prev => [...prev, data])
        })


        socket.on("success_Room", (data) => {
            setroomLogin(data.idRoom)
        })

    }, [socket])

    useEffect(() => {
        const listRooms = async () => {
            try {
                await axios({
                    method: "GET",
                    url: "http://localhost:3001/v1/room/"
                })
                    .then(res => {
                        setlistRoom(res.data)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        listRooms()
        const getMess = async () => {
            try {
                await axios({
                    method: "GET",
                    url: "http://localhost:3001/v1/mess/"
                })
                    .then(res => {
                        const result = res.data.filter(mess => {
                            return mess.idMess === "123123"
                        })

                        setListMess(result)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        getMess()

    }, [])





    return (
        <div style={{
            backgroundColor: "green",
            width: 800,
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20
        }}>
            <div>
                <input value={text} style={{ marginLeft: 15, marginTop: 20 }} onChange={(e) => {
                    settext(e.target.value)
                }} />
                <button style={{ marginLeft: 75, marginTop: 20 }} onClick={handleLogin} >Login</button>
            </div>
            <div className='listMess' style={{ height: "auto", overflow: "auto", overflowX: "hidden", backgroundColor: "red", width: 400, height: 400, marginBottom: 100, flexWrap: "wrap" }}>
                {listmess?.map((mess) => {
                    return <h1>{mess.mess}</h1>
                })}
            </div>
            <input onChange={(e) => {
                setroom(e.target.value)
            }} />
            <button onClick={joinRoom}>Join room</button>
            <div className='listMess' style={{ height: "auto", overflow: "auto", overflowX: "hidden", backgroundColor: "red", width: 400, height: 400, marginBottom: 100, flexWrap: "wrap" }}>
                {listRoom?.map((room) => {
                    return <h1>{room.idRoom}</h1>
                })}
            </div>

        </div>
    )
}

export default Login