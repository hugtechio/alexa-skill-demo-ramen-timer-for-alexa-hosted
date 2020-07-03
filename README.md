# alexa-skill-demo-ramen-timer-for-alexa-hosted

https://aajug.connpass.com/event/178090/

# Importing the skill to Developer Console

Import from this git ripository on the Alexa Developer Console with Import feature.

How to import this skill to the Developer console.  
https://drive.google.com/file/d/1QK3nQirxZ0JmqT_0XXB1T-MhvBw_bVch/view?usp=sharing

Blog post (import feature)  
https://developer.amazon.com/en-US/docs/alexa/hosted-skills/alexa-hosted-skills-git-import.html

Important: It's neccesarry to choose Japanese as a skill language.

Below is summary of this skill
# Summary

Timer API

Announcement Timer API  
https://developer.amazon.com/ja-JP/blogs/alexa/alexa-skills-kit/2020/04/add-timer-capabilities-to-increase-retention-in-your-alexa-skill-with-the-timers-api

Timer API Reference  
https://developer.amazon.com/en-US/docs/alexa/smapi/alexa-timers-api-reference.html


# 必要なもの
Amazon Developer アカウントを持ってない人は、developer.amazon.com で 作成してください。

確認用 Echo デバイス（またはアレクサアプリ）  * Timer API は  Developer Console で確認できません。


# 課題
カップ麺タイマーを作ります。

デモ動画１（スキルからタイマー起動）  
https://drive.google.com/file/d/14W-T1Rqlae-de-OIDinAUW2UULAAjpny/view?usp=sharing

デモ動画２（タイマー起動するまで）  
https://drive.google.com/file/d/1Lumpp8gcbRE4jrxE3rwHbhLpBnEa3Ey5/view?usp=sharing


スキル名： カップ麺タイマー  

ハッピーパス：
ユーザー：「アレクサ、カップ麺タイマーを開いて」
アレクサ：「こんにちは。カップ麺タイマーです。カップ麺にお湯を入れたら、アレクサ、カップ麺タイマーを起動して、５分ね。と、私を呼び出してください。「固め」、「やわらかめ」と言うこともできますよ？」
ユーザー「ラ王を固めで」
アレクサ：「ラ王を固めですね。できたらお知らせしますね。」
（タイマー起動）

パーミッションがないとき：
ユーザー：「アレクサ、カップ麺タイマーを開いて」
アレクサ：「カップ麺タイマースキルでタイマーの許可を与えることができます。許可しますか？」
ユーザー：「はい」
アレクサ：「アレクサアプリの マイスキルから許可を有効にしてください」
ユーザー：（マイスキルに飛んで、リクエストを有効かする）
アレクサ：「アレクサ：「こんにちは。カップ麺タイマーです。カップ麺にお湯を入れたら、アレクサ、カップ麺タイマーを起動して、５分ね。と、私を呼び出してください。「固め」、「やわらかめ」と言うこともできますよ？」
：


# タイマーの動き
カップ麺：「ラ王」or 「どん兵衛」  
かたさ：「かため」or 「やわらかめ」   
or  
待ち時間(単位：分）  

ラ王は３分、どん兵衛は５分が標準  
かためは標準時間から-1分、やわらかめは+1分  
待ち時間が指定された場合はその時間で待つ  

# ソースコードについて
課題のコードは３つのファイルに別れています。

index.js  
Alexa Skill の エントリポイントです。Alexaのリクエストをハンドリングします  
talk.js  
ユーザーへのレスポンスです。ユーザーに応答する発話が全て格納されています  
timer.js  
タイマーAPI に関する処理です。タイマーAPI の呼び出し、呼び出す際のパラメーターの作成。タイマーAPIを利用するためのパーミッションの処理が含まれます。  


# セットアップ (所用時間：5分)
今回のハンズオンでは、Alexa Hosted Skill を使って、課題を進めます。

## 課題のインポート
Alexa Hosted Skill の インポート機能を使って、以下のリポジトリからスキルの雛形を作成します。  
https://github.com/hugtechio/alexa-skill-demo-ramen-timer-for-alexa-hosted.git  


呼び出し名が change me となっていたら変更してください。（呼び出し名が重複していて、セットできていません）

セットアップ動画
https://drive.google.com/file/d/1QK3nQirxZ0JmqT_0XXB1T-MhvBw_bVch/view?usp=sharing



# ハンズオン (45分)
課題が埋め込まれた ソースコード をGitHubに格納しています。ソースコードの中の課題を順に進めます。

課題は３つあります。

[課題1]  ユーザーにタイマー利用の許可を尋ねる  
[課題2] handler から タイマーの関数を呼び出す（中身は課題３で実装）  
[課題3] タイマーAPI を実際に呼び出すコードを書く  

課題１から順番に進めます。各課題の所用時間はおよそ１５分です。課題を一つ終わるごとに、答え合わせをして次の課題に進みます。

## 課題1
タイマーAPIを利用するには、ユーザーの許可が必要です。アレクサスキルでは、音声で許可を尋ねることができます。  
https://developer.amazon.com/ja-JP/docs/alexa/smapi/voice-permissions-for-timers.html

index.js の LaunchRequest 関数と、timer.js の verifyConsentToken 関数を編集して、ユーザーが タイマーAPIを許可してなければ、確認するコードを記述してください。

実装おわったら、コンソールでスキルを呼び出して見ましょう。許可を尋ねられれば成功です。失敗していたら、「課題１を実装してください」と言われます。


## 課題2
スキルでは、「ラ王を固めで」のようにユーザーが発話します。この発話に対応するインテントが、SetNoodleTimerIntent です。index.js の中にあります。  

インテントには、noodle, softy, minutes という３つのスロットが設定されており、それぞれ、「カップ麺の名前」、「かたさ」、「時間（分）」に対応しています。  

SetNoodleTimerIntent を編集して、スロットから値を取得するコードを記述してください。  
タイマーを実行する関数は、timer.runTimer(handlerInput, カップ麺の名前、待ち時間orかたさ) です。  
softy と minutes スロットはどちらか一方しか入りません。入っている方を、関数の 第３引数に入れて呼び出します。  
  
正しく実装されていれば、このインテントは「課題３を実装してください」と発話します。  
実装が不十分のときは、「課題２を実装してください」と発話します。  

## 課題3
タイマーAPIは、handlerInput の serviceClientFactory から クライアントを生成して呼び出します。その際には、タイマーAPIに送るリクエストのパラメーターを作る必要があります。  

スキルの仕様に合わせて、タイマーAPIへのリクエストを作成して、APIを呼び出してください。  

timer.js の getAlexaDuration 関数を編集します。この関数は、カップ麺の名前と、待ち時間 または かたさ を受け取って、タイマーAPIの待機時間の表現形式 ISO8601 の文字列を返します。  

timer.js の getTimerTemplate 関数を編集します。この関数は、この関数は、カップ麺の名前と、待ち時間 または かたさ を受け取って、タイマーAPIのリクエストパラメーターを生成して返します。  

timer.js の runTimer 関数を編集して、実際にアクション１、２で作成した関数を利用して、タイマーAPIを呼び出してください。  

スキルからタイマーを起動することができたら成功です！おつかれさまでした！  


## Appendix
ASK CLI v2 を使う
以下のリポジトリをクローンして利用します。  
https://github.com/hugtechio/alexa-skill-demo-ramen-timer.git

クローン後、ask init を実行して、ask-resources.json を上書きます。何回か入力を求められますが全てEnterでOKです。



