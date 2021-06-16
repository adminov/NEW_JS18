(()=>{"use strict";const e=function(e){const t=document.querySelector("#timer-hours"),o=document.querySelector("#timer-minutes"),n=document.querySelector("#timer-seconds");function c(){const e=(new Date("18 Jun 2021").getTime()-(new Date).getTime())/1e3,t=Math.floor(e%60),o=Math.floor(e/60%60);return{timeRemaining:e,hours:Math.floor(e/60/60),minutes:o,second:t}}c().timeRemaining>=0?setInterval((function(){const e=c();t.textContent=("0"+e.hours).slice(-2),o.textContent=("0"+e.minutes).slice(-2),n.textContent=("0"+e.second).slice(-2)}),1e3):(t.textContent="00",o.textContent="00",n.textContent="00")}(),t=(()=>{const e=document.querySelector("menu");document.addEventListener("click",(t=>{let o=t.target;o.closest(".menu")?e.classList.toggle("active-menu"):(o.closest(".close-btn")||o.closest("a")||!o.closest(".active-menu"))&&e.classList.remove("active-menu")}))})(),o=(()=>{const e=document.querySelector(".popup"),t=document.querySelectorAll(".popup-btn"),o=document.querySelector(".popup-content"),n={count:150,speed:3,start:150,end:0},c=()=>{n.start>n.end?n.count-=n.speed:n.count+=n.speed,o.style.transform=`translateX(${n.count}px)`,(n.start>n.end?n.count>n.end:n.count<n.end)&&requestAnimationFrame(c)};t.forEach((t=>{t.addEventListener("click",(()=>{e.style.display="block",screen.width>768&&(n.count=n.start,requestAnimationFrame(c))}))})),e.addEventListener("click",(t=>{let o=t.target;o.classList.contains("popup-close")?e.style.display="none":(o=o.closest(".popup-content"),o||(e.style.display="none"))}))})(),n=(()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",(e=>{let n=e.target;n=n.closest(".service-header-tab"),n&&t.forEach(((e,c)=>{e===n&&(e=>{for(let n=0;n<o.length;n++)e===n?(t[n].classList.add("active"),o[n].classList.remove("d-none")):(t[n].classList.remove("active"),o[n].classList.add("d-none"))})(c)}))}))})(),c=(()=>{const e=e=>{e.preventDefault();const t=e.currentTarget.getAttribute("href");window.scrollTo({top:document.querySelector(t).offsetTop,behavior:"smooth"})};document.querySelectorAll("menu a").forEach((t=>{t.addEventListener("click",e)}))})(),r=(()=>{const e=document.querySelector(".portfolio-content"),t=document.querySelectorAll(".portfolio-item"),o=document.querySelector(".portfolio-dots");t.forEach((e=>{o.innerHTML+='<li class="dot"></li>'}));const n=document.querySelectorAll(".dot");n[0].classList.add("dot-active");let c,r=0;const a=(e,t,o)=>{e[t].classList.remove(o)},s=(e,t,o)=>{e[t].classList.add(o)},l=()=>{a(t,r,"portfolio-item-active"),a(n,r,"dot-active"),r++,r>=t.length&&(r=0),s(t,r,"portfolio-item-active"),s(n,r,"dot-active")},u=(e=1500)=>{c=setInterval(l,e)};e.addEventListener("click",(e=>{e.preventDefault();let o=e.target;o.matches(".portfolio-btn, .dot")&&(a(t,r,"portfolio-item-active"),a(n,r,"dot-active"),o.matches("#arrow-right")?r++:o.matches("#arrow-left")?r--:o.matches(".dot")&&n.forEach(((e,t)=>{e===o&&(r=t)})),r>=t.length&&(r=0),r<0&&(r=t.length-1),s(t,r,"portfolio-item-active"),s(n,r,"dot-active"))})),e.addEventListener("mouseover",(e=>{const t=e.target;(t.matches(".portfolio-btn")||t.matches(".dot"))&&clearInterval(c)})),e.addEventListener("mouseout",(e=>{const t=e.target;(t.matches(".portfolio-btn")||t.matches(".dot"))&&u()})),u()})(),a=void document.querySelector(".calc-block").querySelectorAll("input").forEach((e=>{e.addEventListener("blur",(e=>{"text"===e.target.type&&(e.target.value=e.target.value.replace(/\D/g,""))}))})),s=(()=>{const e=document.querySelectorAll(".container")[7].querySelectorAll("img"),t=e=>{const t=e.target;if(t.classList.contains("command__photo")){const e=t.src;t.src=t.dataset.img,t.dataset.img=e}};e.forEach((e=>{e.addEventListener("mouseover",t),e.addEventListener("mouseout",t)}))})(),l=(()=>{document.querySelectorAll("input.calc-item");const e=document.querySelectorAll("[name=user_name]"),t=document.querySelectorAll("[name=user_message]"),o=document.querySelectorAll("[name=user_email]"),n=document.querySelectorAll("[name=user_phone]");new Set;const c=e=>{e.value=e.value.replace(/\s+/g," "),e.value=e.value.replace(/\-+/g,"-");let t=new RegExp("ReGeX"+e.value+"ReGeX");/^[/ /-]/.test(t)&&(e.value=e.value.replace(/^[/ /-]/,"")),/[/ /-]$/.test(t)&&(e.value=e.value.replace(/[/ /-]$/,""))},r=(e,t,o="Введите корректные данные")=>{e.value.match(t)||(alert(o),e.value="")};e.forEach((e=>{e.addEventListener("blur",(()=>{c(e),e.value=e.value.split(" ").map((e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join(" "),r(e,/[а-яё]{2,}/gi)}))})),t.forEach((e=>{e.addEventListener("blur",(()=>{r(e,/[^а-яё0-9\.\,\:\-\!\?]/gi),c(e)}))})),o.forEach((e=>{e.addEventListener("blur",(()=>{r(e,/\w+@\w+\.\w{2,3}/g),c(e)}))})),n.forEach((e=>{e.addEventListener("blur",(()=>{c(e),r(e,/^\+?[78]([-()]*\d){6,10}$/g)}))}))})(),u=((e=100)=>{const t=document.querySelector(".calc-block"),o=document.querySelector(".calc-type"),n=document.querySelector(".calc-square"),c=document.querySelector(".calc-day"),r=document.querySelector(".calc-count"),a=document.getElementById("total");let s,l=0;const u=()=>{const e=l,t=+a.textContent,o=e/200;t<e?(a.textContent=Math.floor(t+o),s=setTimeout(u,5)):(a.textContent=e,clearTimeout(s))};t.addEventListener("change",(t=>{const a=t.target;(a.matches("select")||a.matches("input"))&&((()=>{let t=1,a=1;const s=o.value,u=+n.value;r.value>1&&(t+=(r.value-1)/10),c.value&&c.value<5?a*=2:c.value&&c.value<10&&(a*=1.5),s&&u&&(l=e*s*u*t*a),l=Math.floor(l)})(),u())})),o.addEventListener("change",(()=>{l=0}))})(100),i=(()=>{const e=e=>{[...document.getElementById(e).elements].filter((e=>"button"!==e.tagName.toLowerCase()&&"button"!==e.type)).forEach((e=>e.value=""))},t=e=>{const t=e.target;t.matches(".form-phone")&&(t.value=t.value.replace(/[^+\d]/g,"")),"user_name"===t.name&&(t.value=t.value.replace(/[^а-яё ]/gi,"")),t.matches(".mess")&&(t.value=t.value.replace(/[^а-яё ,.]/gi,""))},o=()=>{const e=document.querySelector(".successError");setTimeout((()=>{e.remove(),document.querySelector(".popup").style.display="none"}),2e3)},n=n=>{const r=document.getElementById(n),a=document.createElement("div"),s=document.createElement("img");a.className="successError",a.style.cssText="font-size: 2rem; color: #fff",s.height=50,r.addEventListener("submit",(l=>{const u=new FormData(r),i={};l.preventDefault(),u.forEach(((e,t)=>{i[t]=e})),""===i.user_name||""===i.user_name||""===i.user_name||""===i.user_message?alert("write correct data"):(a.textContent=" Загрузка...",s.src="./images/wait/wait.gif",a.insertBefore(s,a.firstChild),r.appendChild(a),c(i).then((()=>{a.textContent=" Спасибо! Мы скоро с вами свяжемся!",s.src="./images/wait/success.png",a.insertBefore(s,a.firstChild),e(n),o()})).catch((t=>{a.textContent=" Что-то пошло не так...",s.src="./images/wait/error.png",a.insertBefore(s,a.firstChild),e(n),o(),console.error(t)}))),r.addEventListener("input",t)}))};n("form1"),n("form2"),n("form3");const c=e=>new Promise(((t,o)=>{const n=new XMLHttpRequest;n.addEventListener("readystatechange",(()=>{4===n.readyState&&(200===n.status?t():o(n.status))})),n.open("POST","./server.php"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(e))}))})();e(),t(),o(),n(),c(),r(),a(),s(),l(),u(),i()})();