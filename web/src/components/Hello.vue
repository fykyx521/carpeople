<template>
  <div class="hello">
    <ul>
      <li>
         <div>
            <div>5点</div>
            <div>1人</div>
         </div>
      </li>
      <li>
        <div>
            <div>6点</div>
            <div>3人</div>
         </div>
      </li>
      <li>
        <div>
            <div>6点</div>
            <div>3人</div>
         </div>
      </li>
      <li>
        <div>
            <div>6点</div>
            <div>3人</div>
         </div>
      </li>

      <li>
        <div>
            <div>6点</div>
            <div>3人</div>
         </div>
      </li>

      <li>
        <div>
            <div>6点</div>
            <div>3人</div>
         </div>
      </li>
            <li>
        <div>
            <div>6点</div>
            <div>3人</div>
         </div>
      </li>

            <li>
        <div>
            <div>6点</div>
            <div>3人</div>
         </div>
      </li>

    </ul>
    
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .hello{
    display: inline-block;
    width: 100%;;
    white-space:nowrap
 }   
 ul {
  position: absolute;
  white-space:nowrap;
 }
 li {
  display: inline-block;
  width: 150px;
  line-height: 20px;
  white-space:nowrap
 }
</style>
