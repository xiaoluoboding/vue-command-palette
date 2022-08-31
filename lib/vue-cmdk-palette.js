import { defineComponent as e, h as m } from "vue";
const o = e({
  name: "Cmdk",
  setup(n, { attrs: r, slots: t }) {
    return () => m(
      "div",
      {
        "cmdk-root": ""
      },
      t
    );
  }
}), p = Object.assign(o, {
  Root: o
});
export {
  p as Cmdk
};
