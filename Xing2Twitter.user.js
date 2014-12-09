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
                container.style.borderWidth     = '1px';
                container.style.borderStyle     = 'solid';
                container.style.borderColor     = 'black';
                container.style.position        = 'absolute';
                container.style.top             =   '0px';
                container.style.left            = '570px';

                var textInput = msgBox.querySelector('#network-update');
                textInput.addEventListener('keyup', function() {
                    container.textContent = this.value;

                    if (container.textContent.length > 140) {
                        container.style.borderColor = 'red';
                    } else {
                        container.style.borderColor = 'black';
                    }
                }, false);
                msgBox.appendChild(container);

                clearTimeout(loadBox);
            }, 1000);
        }
    }, false);
}, false);
//
//https://twitter.com/AndreJaenisch/status/540843100860858368
//https://twitter.com/search?q=%40andrejaenisch%20xing&src=typd
