import sys
import socket
import time
import multiprocessing

def sendmsg(msgstr,client):
    msg = msgstr.encode("utf-8")
    data_length = len(msg) + 8
    code = 689
    dlbytes = int.to_bytes(data_length,4,'little')
    header = dlbytes + dlbytes + int.to_bytes(code,4,'little')
    
    client.send(header)
    sent = 0
    while sent < len(msg):
        tn = client.send(msg[sent:])
        sent += tn
            
def start(roomid,client):
    sendmsg('type@=loginreq/username@=wnjstudio/password@=douyu/roomid@={}/\0'.format(roomid),client)
    sendmsg('type@=joingroup/rid@={}/gid@=-9999/\0'.format(roomid),client)
    
    print('---------------connected to 4340108---------------')

    while True:
        data = client.recv(12)
        if not data:
            break
        length = int.from_bytes(data[:4],'little')-8
        # l2 = int.from_bytes(data[4:8],'little')
        # if length!=l2:
        #     continue
        message = client.recv(length)
        if not message:
            break
        if not message.endswith(b'\x00'):
            leftlen = length-len(message)
            message += client.recv(leftlen)
        print(message.decode('utf-8','ignore'))
        # print(message)
        sys.stdout.flush()

def keeplive(client):
    while True:
        sendmsg('type@=keeplive/tick@='+str(int(time.time()))+'/\0',client)
        time.sleep(30)

if __name__ == '__main__':
    client = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    host = socket.gethostbyname("openbarrage.douyutv.com")
    port = 8601

    client.connect((host,port))
    
    pget = multiprocessing.Process(target=start,args=(sys.argv[1],client,))
    plive = multiprocessing.Process(target=keeplive,args=(client,))
    pget.start()
    plive.start()