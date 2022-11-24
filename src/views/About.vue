<template>
  <section>
    <section class="p-5 container">
      <div class="mb-0" v-html="this.title"></div>
      <hr class="mt-2 mb-3" />
      <p class="mt-0 mb-3">
        A Rotary club has been in existence since 1933 within Coalville, when it was granted a charter by Rotary International. The members have been giving help to needy parts of the local community since that time, as well as contributing to many international good causes. In the process, we have enjoyed making new friends in the area, and throughout the world.
        <br><br>
        Our experience and skills in community work and volunteering place us in an ideal position to work with organisations such as local businesses, charities, universities, schools, hospitals and environmental groups to support a large variety of good causes. These range from helping at food banks, assisting those affected by flooding, fundraising for local hospices, organising sports tournaments for disabled youngsters and running memory cafés.
        <br><br>
        Our club is also able to work directly with clubs in disaster hit areas across the world to assess what aid is needed and we can be sure that money raised goes directly to those in need. Projects range from providing water and sanitation, disease prevention, literacy projects, education, building schools, hospitals, water wells and growing local economies through sustainable development.
        <br><br>
        When disasters such as earthquakes, typhoons or floods occur around the world, we are quick to respond through our support for survival kits such as ShelterBox and AquaBox, which provide the basic essentials required in an emergency situation.
        <br><br>
        Rotarians from the medical professions use their expertise to run overseas clinics. These include providing much needed hearing aids, glasses and prosthetic limbs to those in areas of the world where these items are in short supply.
        <br><br>
        In Rotary we also have our unique peace programme. We select some of the world’s most dedicated and brightest professionals to receive fully funded fellowships to study at our Rotary Peace Centers. In just over a decade, the Rotary Peace Centers have trained more than 900 fellows globally for careers in peace building. Many of them go on to serve as leaders in national governments, NGOs, the military, law enforcement, and international organizations like the United Nations and World Bank.
        <br><br>
        The Rotary Club within Coalville has recently relaunched as Coalville Belvoir Rotary Club.
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import config from "../config.json";

export default Vue.extend({
  name: "About",
  data() {
    return {
      title: "",
      desc: "",
    };
  },
  created() {
    this.title = config.about.title;
    this.desc = config.about.desc;
  },
});
</script>