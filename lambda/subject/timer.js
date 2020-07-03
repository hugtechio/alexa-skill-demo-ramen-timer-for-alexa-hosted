
const TIMERS_PERMISSION = 'alexa::alerts:timers:skill:readwrite'

const timerConfig = {
    noodle: {
        'ラ王': 3,
        'どん兵衛': 5
    },
    softy: {
        'かため': -1,
        'やわらかめ': 1
    }
}

/**
 * duration の文字列形式 ISO8601 継続期間にコンバートする
 * @param {*} noodleName カップ麺の名前
 * @param {*} softyOrMinutes 麺のかたさ or 分
 */
const getAlexaDuration = (noodleName, softyOrMinutes) => {
    // [課題3] ISO8601 文字列を返す
    //
    // 実装のヒント
    // timerConfig.noodle[noodleName] で、標準の待ち時間を取得
    // softyOrMinutes が 数字だったら、その数字を使ってISO文字列に変換
    // softyOrMinutes が 文字列 だったら、timerConfig.softy[softyOrMinutes] で、
    // 標準の文字列から増減させる分数を取得
    return ''
}

const message = {
    locale: 'ja-JP',
    label: (noodle) => `${noodle} ができるまであと...`,
    done: (noodle) => { 
        return `${noodle} ができました。冷めないうちにどうぞ！`
    }
}

/**
 * Timer API の リクエストパラメーターを作成する
 * @param {*} noodle カップ麺の名前
 * @param {*} softyOrMinutes 麺のかたさ or 分
 */
const getTimerTemplate = (noodle, softyOrMinutes) => {
    // [課題3] TimerAPIへ送るリクエストパラメーターを作成する
    // 
    // https://developer.amazon.com/ja-JP/docs/alexa/smapi/alexa-timers-api-reference.html
    // 作成のヒント
    // 時間経過のときに含めるメッセージ： message.done(noodle) を呼び出して取得
    // タイマーにセットする時間： getAlexaDuration(noodle, softyOrMinutes) を呼び出して取得
    // タイマーラベルにセットする文字列：message.label(noodle, softyOrMinutes) を呼び出して取得
    // タイマーのタイプ：ANNOUNCE
    // ロケール：ja-JP
    // タイマーは見えるように： visibility = 'VISIBLE'
    // スキルの外部からでもタイマー制御できるように：playAudible = true
    return {}
}

/**
 * Timer が許可されてなかったら、許可してもいいかユーザーに尋ねる
 * @param {*} handlerInput
 * @returns 許可されてなかったら、許可を尋ねるレスポンスを返す
 * 許可されてれば nullを。
 */
module.exports = {
    verifyConsentToken: (handlerInput) => {
        let {requestEnvelope} = handlerInput;
        const {permissions} = requestEnvelope.context.System.user;

        // ユーザーがAPIの許可に同意したトークンは、user オブジェクトの中にあります。
        if (!(permissions && permissions.consentToken)){
            console.log('No permissions found!');
            return {
                // [課題1]
                // ここにAPIの利用許可を尋ねるdirective を記述
                // https://developer.amazon.com/ja-JP/docs/alexa/smapi/voice-permissions-for-timers.html
                //
                // 実装のヒント
                // リクエストするスコープ：'alexa::alerts:timers:skill:readwrite'
                // SendRequestの中身で要求する許可の種類: AskForPermissionsConsentRequest
                // name: AskFor
                // type: Connections.SendRequest
            }
        }
        console.log('Permissions found: ' + permissions.consentToken);
        return null;
    },
    /**
     * Timerを有効にしたかどうかの応答状況を返す
     * @param {} handlerInput 
     */
    permissionCallback: (handlerInput) => {
        console.log('Handler: AskForResponseHandler');
        const {request} = handlerInput.requestEnvelope;
        const {payload, status} = request;
        console.log('Connections response status + payload: ' + status + ' - ' + JSON.stringify(payload));

        return {
            code: status.code,
            status: payload.status,
            isCardThrown: payload.isCardThrown
        }
    },
    runTimer: async (handlerInput, noodle, softy) => {
        const {attributesManager, serviceClientFactory} = handlerInput;
        let sessionAttributes = attributesManager.getSessionAttributes();
    
        try {
            // [課題3]タイマーAPIを呼び出すためのClientを handlerInputから生成します。
            //
            // 実装のヒント
            // getTimerManagementServiceClient()
            // createTimer()
            // const timerResponse = xxxxxx
            sessionAttributes['error'] = 500
            sessionAttributes['errorKey'] = 'NOT_IMPLEMENTED_SUBJECT3'
            sessionAttributes['noodle'] = '未実装'
            return sessionAttributes
    
            // [課題3] をやるときにコメントアウトを外してください
            // const timerId = timerResponse.id;
            // const timerStatus = timerResponse.status;
            // console.log(timerResponse)

            // sessionAttributes = attributesManager.getSessionAttributes();
            // sessionAttributes['lastTimerId'] = timerId
            // sessionAttributes['noodle'] = noodle
            // sessionAttributes['softy'] = softy
            // if(timerStatus === 'ON') {
            //     sessionAttributes['lastTimerStatus'] = timerStatus
            //     return sessionAttributes
            // } else {
            //     sessionAttributes['error'] = 308 
            //     sessionAttributes['errorKey'] = 'TIMER_DID_NOT_START'
            //     return sessionAttributes
            // }
        } catch (e) {
            console.log(e)
            sessionAttributes['error'] = e.statusCode
            sessionAttributes['errorKey'] = 'TIMER_DID_NOT_START'
            return sessionAttributes
        }
    }
}

