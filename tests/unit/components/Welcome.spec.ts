import { shallowMount } from "@vue/test-utils";
import Welcome from "@/components/Welcome.vue";

describe("Welcome.vue", () => {
  it("renders hello message", () => {
    const msg = "Single place for all your lottery needs";
    const wrapper = shallowMount(Welcome);
    expect(wrapper.text()).toMatch(msg);
  });
});
