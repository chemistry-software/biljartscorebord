<template>
  <div class="points-display">
    <!-- Loop through each digit in the points string -->
    <div v-for="(digit, index) in points.toString().padStart(nDigits, ' ')" :key="index" class="s7s">
      <input :value="digit" :class="`digit-${digit}`" />
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['points', 'nDigits']
};
</script>

<style>
/* Largely adopted from https://gitlab.com/nerothe/css-only-7-segment-display */
.points-display {
  display: flex;
  justify-content: center;

  --bg-color: none;
  --ia-color: #66666634;
  --a-color: rgb(219, 19, 19);
  --padding-p: 4px;
  --bar-w: 16px;
  --bar-pad: 8px;

  /* no need to change after here */
  --padding: calc(var(--padding-p)*2);
  --bar-h: calc(var(--bar-w)*4);
  --bar-r: calc(var(--bar-w)/2);
  --bar-p: calc(var(--padding-p) + var(--bar-w));
  --bar-p-t: calc(var(--bar-p)*2);
  --c-w: calc(var(--bar-p-t) + var(--bar-h));
  --bar-h-t: calc(var(--bar-h)*2);
  --c-h-np: calc(var(--bar-p-t) + var(--bar-h-t));
  --c-h: calc(calc(var(--c-h-np) + var(--padding-p)) + var(--bar-pad));
}
  
.s7s {
  display: inline-block;
  width: var(--c-w);
  height: var(--c-h);
  background: var(--bg-color);
  position: relative;
  margin: 0;
}
.s7s input {
  display: none;
  background: var(--ia-color);
}
  
.s7s span {
  background: var(--ia-color);
  border-radius: var(--bar-r);
  height: var(--bar-h);
  width: var(--bar-w);
}
  
.s7s span:nth-of-type(3n+1) {
  height: var(--bar-w);
  width: var(--bar-h);
  left: 50%;
  margin-left: calc(var(--bar-h) / -2);
}
  
.s7s span:nth-of-type(1) {
  position: absolute;
  top: var(--padding);
}
  
.s7s span:nth-of-type(2) {
  position: absolute;
  top: var(--bar-p);
  right: var(--padding);
}
  
.s7s span:nth-of-type(3) {
  position: absolute;
  bottom: var(--bar-p);
  right: var(--padding);
}
  
.s7s span:nth-of-type(4) {
  position: absolute;
  bottom: var(--padding);
}
  
.s7s span:nth-of-type(5) {
  position: absolute;
  bottom: var(--bar-p);
  left: var(--padding);
}
  
.s7s span:nth-of-type(6) {
  position: absolute;
  top: var(--bar-p);
  left: var(--padding);
}
  
.s7s span:nth-of-type(7) {
  position: absolute;
  top: 50%;
  margin-top: calc(var(--bar-r) * -1);
}

/* Dynamic styles for each digit */
.s7s input.digit-0 ~ span:nth-of-type(1),
.s7s input.digit-0 ~ span:nth-of-type(2),
.s7s input.digit-0 ~ span:nth-of-type(3),
.s7s input.digit-0 ~ span:nth-of-type(4),
.s7s input.digit-0 ~ span:nth-of-type(5),
.s7s input.digit-0 ~ span:nth-of-type(6) {
  background: var(--a-color);
}

.s7s input.digit-1 ~ span:nth-of-type(2),
.s7s input.digit-1 ~ span:nth-of-type(3) {
  background: var(--a-color);
}

.s7s input.digit-2 ~ span:nth-of-type(1),
.s7s input.digit-2 ~ span:nth-of-type(2),
.s7s input.digit-2 ~ span:nth-of-type(4),
.s7s input.digit-2 ~ span:nth-of-type(5),
.s7s input.digit-2 ~ span:nth-of-type(7) {
  background: var(--a-color);
}

.s7s input.digit-3 ~ span:nth-of-type(1),
.s7s input.digit-3 ~ span:nth-of-type(2),
.s7s input.digit-3 ~ span:nth-of-type(3),
.s7s input.digit-3 ~ span:nth-of-type(4),
.s7s input.digit-3 ~ span:nth-of-type(7) {
  background: var(--a-color);
}

.s7s input.digit-4 ~ span:nth-of-type(2),
.s7s input.digit-4 ~ span:nth-of-type(3),
.s7s input.digit-4 ~ span:nth-of-type(6),
.s7s input.digit-4 ~ span:nth-of-type(7) {
  background: var(--a-color);
}

.s7s input.digit-5 ~ span:nth-of-type(1),
.s7s input.digit-5 ~ span:nth-of-type(3),
.s7s input.digit-5 ~ span:nth-of-type(4),
.s7s input.digit-5 ~ span:nth-of-type(6),
.s7s input.digit-5 ~ span:nth-of-type(7) {
  background: var(--a-color);
}

.s7s input.digit-6 ~ span:nth-of-type(1),
.s7s input.digit-6 ~ span:nth-of-type(3),
.s7s input.digit-6 ~ span:nth-of-type(4),
.s7s input.digit-6 ~ span:nth-of-type(5),
.s7s input.digit-6 ~ span:nth-of-type(6),
.s7s input.digit-6 ~ span:nth-of-type(7) {
  background: var(--a-color);
}

.s7s input.digit-7 ~ span:nth-of-type(1),
.s7s input.digit-7 ~ span:nth-of-type(2),
.s7s input.digit-7 ~ span:nth-of-type(3) {
  background: var(--a-color);
}

.s7s input.digit-8 ~ span:nth-of-type(1),
.s7s input.digit-8 ~ span:nth-of-type(2),
.s7s input.digit-8 ~ span:nth-of-type(3),
.s7s input.digit-8 ~ span:nth-of-type(4),
.s7s input.digit-8 ~ span:nth-of-type(5),
.s7s input.digit-8 ~ span:nth-of-type(6),
.s7s input.digit-8 ~ span:nth-of-type(7) {
  background: var(--a-color);
}

.s7s input.digit-9 ~ span:nth-of-type(1),
.s7s input.digit-9 ~ span:nth-of-type(2),
.s7s input.digit-9 ~ span:nth-of-type(3),
.s7s input.digit-9 ~ span:nth-of-type(4),
.s7s input.digit-9 ~ span:nth-of-type(6),
.s7s input.digit-9 ~ span:nth-of-type(7) {
  background: var(--a-color);
}
</style>