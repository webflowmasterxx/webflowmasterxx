import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper.min.mjs";
import A11y from "https://cdn.jsdelivr.net/npm/swiper@11/modules/a11y.min.mjs";

(function (e, s) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = s() :
        "function" == typeof define && define.amd ? define(s) :
            (e = "undefined" != typeof globalThis ? globalThis : e || self).EffectCarousel = s()
})(this, (function () {
    "use strict";
    return function ({ swiper: e, on: s, extendParams: t }) {
        t({
            carouselEffect: {
                opacityStep: .33,
                scaleStep: .2,
                sideSlides: 2
            }
        }), s("beforeInit", (() => {
            if ("carousel" !== e.params.effect) return;
            e.classNames.push(`${e.params.containerModifierClass}carousel`);
            const s = {
                watchSlidesProgress: !0,
                centeredSlides: !0
            };
            Object.assign(e.params, s), Object.assign(e.originalParams, s)
        })), s("progress", (() => {
            if ("carousel" !== e.params.effect) return;
            const { scaleStep: s, opacityStep: t } = e.params.carouselEffect,
                r = Math.max(Math.min(e.params.carouselEffect.sideSlides, 2), 1),
                i = e.slides.length;
            for (let a = 0; a < e.slides.length; a += 1) {
                const o = e.slides[a], l = e.slides[a].progress,
                    n = Math.abs(l);
                let c = 1;
                n > 1 && (c = .3 * (n - 1) * (2 === r ? 1 : 2) + 1);
                const p = o.querySelectorAll(".swiper-carousel-animate-opacity"),
                    f = l * c * 50 * (e.rtlTranslate ? -1 : 1) + "%",
                    u = 1 - n * s,
                    d = i - Math.abs(Math.round(l));
                o.style.transform = `translateX(${f}) scale(${u})`,
                o.style.zIndex = d,
                o.style.opacity = n > 3 ? 0 : 1,
                p.forEach((e => {
                    e.style.opacity = 1 - n * t
                }))
            }
        })), s("setTransition", ((s, t) => {
            if ("carousel" === e.params.effect)
                for (let s = 0; s < e.slides.length; s += 1) {
                    const r = e.slides[s],
                        i = r.querySelectorAll(".swiper-carousel-animate-opacity");
                    r.style.transitionDuration = `${t}ms`,
                    i.forEach((e => {
                        e.style.transitionDuration = `${t}ms`
                    }))
                }
        }))
    }
}));

const initSwiper = e => {
    if (!e) return;
    new Swiper(e, {
        modules: [A11y, EffectCarousel],
        slidesPerView: "auto",
        carouselEffect: { opacityStep: 0 },
        loop: true,
        watchSlidesProgress: true,
        breakpoints: {
            768: {},
            1280: {},
            1920: {}
        },
        initialSlide: 2,
        grabCursor: true,
        effect: "carousel",
        slidesPerGroupAuto: false,
        centeredSlides: true
    })
};

let swiperEl = document.querySelector(".swiper-green-marrilee-878");
if (swiperEl) {
    initSwiper(swiperEl)
} else {
    document.addEventListener("DOMContentLoaded", (() => {
        swiperEl = document.querySelector(".swiper-green-marrilee-878");
        if (swiperEl) {
            initSwiper(swiperEl)
        }
    }))
}
