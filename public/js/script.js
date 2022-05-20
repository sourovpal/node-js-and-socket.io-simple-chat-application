(function(){
    "use strict";
    const action = (new URL(location.href).searchParams.get('action'));
    const friend = (new URL(location.href).searchParams.get('friend'));
    const socket = io();
    socket.emit('join', {user_id});
    socket.on('get_all_users', ({users})=>{
        var output = '';
        users.forEach((user)=>{
            let currentTime = moment(user.updated_at).calendar().search('/')>-1?moment(user.updated_at).format('LL')+' at '+moment(message.updated_at).format('LT'):moment(user.updated_at).calendar();
            if(user.id !== user_id){
                output += `
                <li class="list-item mb-1">
                    <a class="list-link" href="?friend=${user.id}&action=chat">
                        <div class="user">
                            <div class="avater">
                                ${user.status?'<div class="user-status"></div>':''}
                                <img class="avater-img" src="/images/user/admin.png" alt="">
                            </div>
                            <div class="info">
                                <h6 class="name mb-0 text-capitalize">${user.name}
                                    ${user.total_notifications?'<span class="px-1 text-white bg-danger fs-10 ms-2" style="border-radius:50%;">'+user.total_notifications+'</span>':''}
                                </h6>
                                <p class="current-message unseen0 mb-0 fs-11">
                                    ${user.status?'<span class="">Active Now</span>':currentTime}
                                </p>
                            </div>
                        </div>
                    </a>
                </li>
                `;
            }
        });
        $('.user-list').html(output);

        if(action === 'chat' && friend > 0){
            let user = users.find(user => user.id == friend);
            let currentTime = moment(user.updated_at).calendar().search('/')>-1?moment(user.updated_at).format('LL')+' at '+moment(message.updated_at).format('LT'):moment(user.updated_at).calendar();
            let userHtml = `
                <div class="target-user">
                    <div class="user">
                        <div class="avater">
                            ${user.status?'<div class="user-status"></div>':''}
                            <img class="avater-img" src="/images/user/admin.png" alt="">
                        </div>
                        <div class="info">
                            <h6 class="name mb-0 text-capitalize">${user.f_name+' '+user.l_name}</h6>
                            <p class="current-message unseen0 mb-0 fs-11">
                                ${user.status?'<span class="">Active Now</span>':currentTime}
                            </p>
                        </div>
                    </div>
                </div>
                `;
            $('#select__user').html(userHtml);
        }

    });


    if(action === 'chat' && friend > 0){
        socket.emit('fetch_message', {sender_id:user_id, receiver_id:friend});
        socket.on('get_message', ({messages})=>{
            let output = '';
            messages.forEach((message)=>{
                let currentTime = moment(message.created_at).calendar().search('/')>-1?moment(message.created_at).format('LL')+' at '+moment(message.created_at).format('LT'):moment(message.created_at).calendar();
                if(message.sender_id == user_id){
                    output +=`
                        <div class="message me">
                            <div class="message-text">
                                <span class="text">${message.message}</span>
                            </div>
                            <span class="fs-11 d-block mt-1 text-secondary">${currentTime}</span>
                        </div>                    
                    `;
                }else{
                    output +=`
                        <div class="message friend">
                            <div class="message-text">
                                <span class="text">${message.message}</span>
                            </div>
                            <span class="fs-11 d-block mt-1 text-secondary">${currentTime}</span>
                        </div>                   
                    `;
                }
            });
            $('#chat__box_message').html(output);
            $('#chat__box_message')[0].scrollTop=$('#chat__box_message')[0].scrollHeight;
        });
        $('#send_message_btn').click(()=>{
            var message = $('#input_message').val().trim();
            if(message != null && message != ''){
                socket.emit('send_message', {
                    sender_id:user_id, 
                    receiver_id:friend,
                    message,
                });
                $('#input_message').val('');
            }
        });
        socket.on('receive_message', (message)=>{
            if(message.sender_id == friend || message.receiver_id == friend){
                var output = '';
                if(message.sender_id == user_id){
                    output +=`
                        <div class="message me">
                            <div class="message-text">
                                <span class="text">${message.message}</span>
                            </div>
                            <span class="fs-11 d-block mt-1 text-secondary">${moment(message.created_at).calendar()}</span>
                        </div>                    
                    `;
                }else{
                    output +=`
                        <div class="message friend">
                            <div class="message-text">
                                <span class="text">${message.message}</span>
                            </div>
                            <span class="fs-11 d-block mt-1 text-secondary">${moment(message.created_at).calendar()}</span>
                        </div>                   
                    `;
                }
                $('#chat__box_message').append(output);
                $('#chat__box_message')[0].scrollTop=$('#chat__box_message')[0].scrollHeight;
            }
        });
    }
    // 

})();