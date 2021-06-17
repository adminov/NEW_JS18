(()=>{"use strict";(function(e="19 Jun 2021"){const t=document.querySelector("#timer-hours"),o=document.querySelector("#timer-minutes"),n=document.querySelector("#timer-seconds");function r(){const t=(new Date(e).getTime()-(new Date).getTime())/1e3,o=Math.floor(t%60),n=Math.floor(t/60%60);return{timeRemaining:t,hours:Math.floor(t/60/60),minutes:n,second:o}}r().timeRemaining>=0?setInterval((function(){const e=r();t.textContent=("0"+e.hours).slice(-2),o.textContent=("0"+e.minutes).slice(-2),n.textContent=("0"+e.second).slice(-2)}),1e3):(t.textContent="00",o.textContent="00",n.textContent="00")})(),(()=>{const e=document.querySelector("menu");document.addEventListener("click",(t=>{let o=t.target;o.closest(".menu")?e.classList.toggle("active-menu"):(o.closest(".close-btn")||o.closest("a")||!o.closest(".active-menu"))&&e.classList.remove("active-menu")}))})(),(()=>{const e=document.querySelector(".popup"),t=document.querySelectorAll(".popup-btn"),o=document.querySelector(".popup-content"),n={count:150,speed:3,start:150,end:0},r=()=>{n.start>n.end?n.count-=n.speed:n.count+=n.speed,o.style.transform=`translateX(${n.count}px)`,(n.start>n.end?n.count>n.end:n.count<n.end)&&requestAnimationFrame(r)};t.forEach((t=>{t.addEventListener("click",(()=>{e.style.display="block",screen.width>768&&(n.count=n.start,requestAnimationFrame(r))}))})),e.addEventListener("click",(t=>{let o=t.target;o.classList.contains("popup-close")?e.style.display="none":(o=o.closest(".popup-content"),o||(e.style.display="none"))}))})(),(()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",(e=>{let n=e.target;n=n.closest(".service-header-tab"),n&&t.forEach(((e,r)=>{e===n&&(e=>{for(let n=0;n<o.length;n++)e===n?(t[n].classList.add("active"),o[n].classList.remove("d-none")):(t[n].classList.remove("active"),o[n].classList.add("d-none"))})(r)}))}))})(),(()=>{const e=e=>{e.preventDefault();const t=e.currentTarget.getAttribute("href");window.scrollTo({top:document.querySelector(t).offsetTop,behavior:"smooth"})};document.querySelectorAll("menu a").forEach((t=>{t.addEventListener("click",e)}))})(),(()=>{const e=document.querySelector(".portfolio-content"),t=document.querySelectorAll(".portfolio-item"),o=document.querySelector(".portfolio-dots");t.forEach((e=>{o.innerHTML+='<li class="dot"></li>'}));const n=document.querySelectorAll(".dot");n[0].classList.add("dot-active");let r,c=0;const a=(e,t,o)=>{e[t].classList.remove(o)},s=(e,t,o)=>{e[t].classList.add(o)},l=()=>{a(t,c,"portfolio-item-active"),a(n,c,"dot-active"),c++,c>=t.length&&(c=0),s(t,c,"portfolio-item-active"),s(n,c,"dot-active")},u=(e=1500)=>{r=setInterval(l,e)};e.addEventListener("click",(e=>{e.preventDefault();let o=e.target;o.matches(".portfolio-btn, .dot")&&(a(t,c,"portfolio-item-active"),a(n,c,"dot-active"),o.matches("#arrow-right")?c++:o.matches("#arrow-left")?c--:o.matches(".dot")&&n.forEach(((e,t)=>{e===o&&(c=t)})),c>=t.length&&(c=0),c<0&&(c=t.length-1),s(t,c,"portfolio-item-active"),s(n,c,"dot-active"))})),e.addEventListener("mouseover",(e=>{const t=e.target;(t.matches(".portfolio-btn")||t.matches(".dot"))&&clearInterval(r)})),e.addEventListener("mouseout",(e=>{const t=e.target;(t.matches(".portfolio-btn")||t.matches(".dot"))&&u()})),u()})(),document.querySelector(".calc-block").querySelectorAll("input").forEach((e=>{e.addEventListener("blur",(e=>{"text"===e.target.type&&(e.target.value=e.target.value.replace(/\D/g,""))}))})),(()=>{const e=document.querySelectorAll(".container")[7].querySelectorAll("img"),t=e=>{const t=e.target;if(t.classList.contains("command__photo")){const e=t.src;t.src=t.dataset.img,t.dataset.img=e}};e.forEach((e=>{e.addEventListener("mouseover",t),e.addEventListener("mouseout",t)}))})(),(()=>{const e=document.querySelectorAll("[name=user_name]"),t=document.querySelectorAll("[name=user_message]"),o=document.querySelectorAll("[name=user_email]"),n=document.querySelectorAll("[name=user_phone]"),r=e=>{e.value=e.value.replace(/\s+/g," "),e.value=e.value.replace(/\-+/g,"-");let t=new RegExp("ReGeX"+e.value+"ReGeX");/^[/ /-]/.test(t)&&(e.value=e.value.replace(/^[/ /-]/,"")),/[/ /-]$/.test(t)&&(e.value=e.value.replace(/[/ /-]$/,""))},c=(e,t,o="Введите корректные данные")=>{e.value.match(t)||(alert(o),e.value="")};e.forEach((e=>{e.addEventListener("blur",(()=>{r(e),e.value=e.value.split(" ").map((e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join(" "),c(e,/[а-яё]{2,}/gi)}))})),t.forEach((e=>{e.addEventListener("blur",(()=>{c(e,/[^а-яё0-9\.\,\:\-\!\?]/gi),r(e)}))})),o.forEach((e=>{e.addEventListener("blur",(()=>{c(e,/\w+@\w+\.\w{2,3}/g),r(e)}))})),n.forEach((e=>{e.addEventListener("blur",(()=>{r(e),c(e,/^\+?[78]([-()]*\d){6,10}$/g)}))}))})(),((e=100)=>{const t=document.querySelector(".calc-block"),o=document.querySelector(".calc-type"),n=document.querySelector(".calc-square"),r=document.querySelector(".calc-day"),c=document.querySelector(".calc-count"),a=document.getElementById("total");let s,l=0;const u=()=>{const e=l,t=+a.textContent,o=e/200;t<e?(a.textContent=Math.floor(t+o),s=setTimeout(u,5)):(a.textContent=e,clearTimeout(s))};t.addEventListener("change",(t=>{const a=t.target;(a.matches("select")||a.matches("input"))&&((()=>{let t=1,a=1;const s=o.value,u=+n.value;c.value>1&&(t+=(c.value-1)/10),r.value&&r.value<5?a*=2:r.value&&r.value<10&&(a*=1.5),s&&u&&(l=e*s*u*t*a),l=Math.floor(l)})(),u())})),o.addEventListener("change",(()=>{l=0}))})(),(()=>{const e=e=>{[...document.getElementById(e).elements].filter((e=>"button"!==e.tagName.toLowerCase()&&"button"!==e.type)).forEach((e=>e.value=""))},t=e=>{const t=e.target;t.matches(".form-phone")&&(t.value=t.value.replace(/[^+\d]/g,"")),"user_name"===t.name&&(t.value=t.value.replace(/[^а-яё ]/gi,"")),t.matches(".mess")&&(t.value=t.value.replace(/[^а-яё ,.]/gi,""))},o=()=>{const e=document.querySelector(".successError");setTimeout((()=>{e.remove(),document.querySelector(".popup").style.display="none"}),2e3)},n=n=>{const c=document.getElementById(n),a=document.createElement("div"),s=document.createElement("img");a.className="successError",a.style.cssText="font-size: 2rem; color: #fff",s.height=50,c.addEventListener("submit",(l=>{l.preventDefault();const u=new FormData(c),i={};u.forEach(((e,t)=>{i[t]=e})),""===i.user_name||""===i.user_name||""===i.user_name||""===i.user_message?alert("write correct data"):(a.textContent=" Загрузка...",s.src="./images/wait/wait.gif",a.insertBefore(s,a.firstChild),c.appendChild(a),r(i).then((()=>{a.textContent=" Спасибо! Мы скоро с вами свяжемся!",s.src="./images/wait/success.png",a.insertBefore(s,a.firstChild),e(n),o()})).catch((t=>{a.textContent=" Что-то пошло не так...",s.src="./images/wait/error.png",a.insertBefore(s,a.firstChild),e(n),o(),console.error(t)}))),c.addEventListener("input",t)}))};n("form1"),n("form2"),n("form3");const r=e=>new Promise(((t,o)=>{const n=new XMLHttpRequest;n.addEventListener("readystatechange",(()=>{4===n.readyState&&(200===n.status?t():o(n.status))})),n.open("POST","./server.php"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(e))}))})()})();