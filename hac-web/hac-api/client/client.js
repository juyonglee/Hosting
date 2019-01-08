
'use strict';
const net = require('net');
/*
* tcpclient 클래스
*/
class tcpClient {
    /*
    * 생성자
    */
    constructor(host, port, onCreate, onRead, onEnd, onError) {
        this.options = {
            host: host,
            port: port
        };
        this.onCreate = onCreate;
        this.onRead = onRead;
        this.onEnd = onEnd;
        this.onError = onError;
    }

    /*
    * 접속 함수
    */
    connect() {
        this.client = net.connect(this.options, () => {
            if (this.onCreate)
                this.onCreate(this.options);
        });
        // 데이터 수신 처리
        this.client.on('data', (data) => {
            var sz = this.merge ? this.merge + data.toString() : data.toString();
            var arr = sz.split('¶');
            for (var n in arr) {
                if (sz.charAt(sz.length - 1) != '¶' && n == arr.length - 1) {
                    this.merge = arr[n];
                    break;
                } else if (arr[n] == "") {
                    break;
                } else {
                    this.onRead(this.options, JSON.parse(arr[n]));

                    this.merge = null;  //이전 버퍼 저장 오류 보완
                }
            }


        });

        // 접속 종료 처리
        this.client.on('close', () => {
            if (this.onEnd)
                this.onEnd(this.options);
        });

        // 에러 처리
        this.client.on('error', (err) => {
            if (this.onError)
                this.onError(this.options, err);
        });
    }

    /*
     * 데이터 발송
     */
    write(packet) {
        try {
            this.client.write(JSON.stringify(packet) + '¶');
        }
        catch (exception) {
            console.log(exception);
        }
    }
}

module.exports = tcpClient;
