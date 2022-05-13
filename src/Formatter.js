import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { formattingTwoLanguage, objectToArray } from './functions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Formatter.scss';

const Formatter = () => {
    const [needToPhrase, setNeedToPhrase] = useState();
    const [translated, setTranslated] = useState();
    const [copied, setCopied] = useState();

    const phraseInput = useRef();
    const translatedInput = useRef();
    const formattedWording = useRef();

    const handleOnClick = () => {
        if (phraseInput?.current?.value && translatedInput?.current?.value) {
            let phraseObject = JSON.parse(phraseInput?.current?.value);
            let translatedObject = JSON.parse(translatedInput?.current?.value);
            setNeedToPhrase(objectToArray(phraseObject));
            setTranslated(objectToArray(translatedObject));
        }
    };
    //     const copyWording = (e) => {
    //       e.preventDefault
    //       const formattedWording = formattedWording.current
    //       if(formattedWording) {
    //         formattedWording.select()
    // document.execCommand('copy')
    //       }
    //     };

    const handleCopy = () => {
        setCopied('복사되었습니다');
        setTimeout(() => {
            setCopied('');
        }, 3000);
    };

    return (
        <div className="formatter">
            <div>
                <header>번역할 문구</header>
                <input
                    ref={phraseInput}
                    value={needToPhrase}
                    placeholder="번역할 JSON형태의 문구를 넣어주세요"
                />
            </div>
            <div>
                <header>번역된 문구</header>
                <input
                    ref={translatedInput}
                    value={translated}
                    placeholder="번역된 JSON형태의 문구를 넣어주세요"
                />
            </div>
            <button onClick={handleOnClick}>실행</button>

            <div>
                <header>복사해서 사용하세요 {copied && copied}</header>
                <CopyToClipboard text={formattedWording?.current?.value} onCopy={handleCopy}>
                    <button>복사하기</button>
                </CopyToClipboard>
                <div className="separated-box">
                    <CopyToClipboard text={formattedWording?.current?.value}>
                        <div>
                            {needToPhrase &&
                                translated &&
                                needToPhrase.map((phraseWording, phraseIdx) => {
                                    return translated.map((translatedWording, translatedIdx) => {
                                        if (phraseIdx === translatedIdx) {
                                            return (
                                                <ul
                                                    ref={formattedWording}
                                                    key={phraseWording + translatedWording}
                                                >
                                                    {phraseWording} : {translatedWording}
                                                </ul>
                                            );
                                        }
                                    });
                                })}
                        </div>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    );
};

export default Formatter;
