const { getMessage, saveMessage } = require('../Models/Message');
const User = require('../Models/User');
const Auth = require('../Models/Auth');
module.exports = (socket, io)=>{
    console.log('New User Connected');
    /**
    *
    **/
    socket.on('join', async({user_id})=>{
        socket.join('user_id_'+user_id);
        await User.status(user_id, 1);
        const users = await User.get(user_id);
        socket.emit('get_all_users', {users});
        setInterval(async()=>{
            let users = await User.get(user_id);
            socket.emit('get_all_users', {users});
        }, (1000 * 5));
    });
    //
    socket.on('fetch_message', async({sender_id, receiver_id})=>{
        const messages = await getMessage(sender_id, receiver_id);
        socket.emit('get_message', {messages});
    });
    socket.on('send_message', async(data)=>{
        const result = await saveMessage(data);
        if(result){
            socket.to('user_id_'+data.receiver_id).emit('receive_message', result);
            socket.emit('receive_message', result);
        }
    });
    /**
    *
    **/
    socket.on('disconnecting', async()=>{
        socket.rooms.forEach(async(room)=>{
            if(room.search('user_id_') > -1){
                let user_id = room.replace('user_id_', '');
                await User.status(user_id, 0);
            }
        });
    });
    /**
    *
    **/
    socket.on('disconnect', async()=>{
        console.log('disconnect');
    });
}