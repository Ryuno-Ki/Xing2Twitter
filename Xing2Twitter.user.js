// ==UserScript==
// @name        Xing2Twitter
// @namespace   https://github.com/Ryuno-Ki/Xing2Twitter
// @description Twitter preview for XING
// @include     https://www.xing.com/*
// @version     0.0.1
// @grant       GM_log
// ==/UserScript==
// Contact: andre.jaenisch@openmailbox.org

var doc = document.addEventListener('DOMContentLoaded', function() {
    console.log('Loaded Xing2Twitter UserScript!');
    var newsFeedHome = document.querySelector('#news-feed-home');
    newsFeedHome.addEventListener('click', function(e) {
        if (e.target.classList.contains('inputfield')) {
            // Composing a new message
            var msgBox = this.querySelector('.edit-mode');
            // Since the website needs some time to load the widget, wait
            var loadBox = setTimeout(function() { 
                var container = document.createElement('div');
                container.style.backgroundColor = 'white';
                container.style.border          = '1px solid #C8C8C8';
                container.style.borderRadius    = '5px';
                container.style.boxShadow       = '0px 0px 10px rgba(0, 0, 0, 0.4)';
                container.style.padding         = '8px 8px 0px 0px';
                container.style.position        = 'absolute';
                container.style.top             = '0px';
                container.style.left            = '570px';

                var quote = document.createElement('blockquote');
                quote.style.borderWidth = '0px';
                quote.style.margin      = '0px 5px 0px 0px';
                quote.style.padding     = '4px 8px 8px 4px';
                quote.style.overflow    = 'hidden';
                quote.style.wordWrap    = 'break-word';
                quote.style.whiteSpace  = 'pre-wrap';

                var statusAction       = msgBox.querySelector('#status-actions');
                var submitButton       = msgBox.querySelector('button');
                var charsLeftContainer = document.createElement('span');
                var charsLeft          = document.createElement('span');
                charsLeftContainer.appendChild(charsLeft);
                charsLeftContainer.appendChild(document.createTextNode(' Zeichen übrig'));
                statusAction.appendChild(charsLeftContainer);

                var textInput = msgBox.querySelector('#network-update');
                textInput.addEventListener('keyup', function() {
                    quote.textContent = this.value;
                    charsLeft.textContent = 140 - parseInt(quote.textContent.length);

                    if (quote.textContent.length > 140) {
                        container.style.borderColor = 'red';
                    } else {
                        container.style.borderColor = 'black';
                    }
                }, false);
                container.appendChild(quote);
                msgBox.appendChild(container);

                clearTimeout(loadBox);
            }, 1000);
        }
    }, false);
}, false);
//
//https://twitter.com/AndreJaenisch/status/540843100860858368
//https://twitter.com/search?q=%40andrejaenisch%20xing&src=typd
