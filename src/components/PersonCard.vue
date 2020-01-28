<template>
  <el-card :body-style="{ padding: 0 }" class="person-card">
    <div class="person-card__image-wrapper">
      <img src="https://s2.glbimg.com/LttsvVoQZGHoIJsmdlXMULY336A=/e.glbimg.com/og/ed/f/original/2019/09/23/ea1e16061bdf92edb111d8808c6741a6.jpg" class="image">
    </div>
    <div class="person-card__body">
      <div class="person-card__body__title">
        Luke Skywalker
      </div>
      <div class="person-card__body__height">
        172 cm
      </div>
      <div class="person-card__body__weight">
        77 kg
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PersonCard',
  props: {}
}
</script>

<style lang="scss" scoped>
.person-card {
  border: 0;

  .el-card__body {
    padding: 0;
  }

  &:hover {
    cursor: pointer;

    .person-card__image-wrapper {
      img {
        transform: scale(1.2);
      }
    }
  }

  &__image-wrapper {
    width: 100%;
    height: 300px;
    position: relative;
    overflow: hidden;

    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      content: '';
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: .3s;
    }
  }

  &__body {
    padding: 20px;

    &__title {
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 10px;
    }

    &__height {
      margin-bottom: 5px;
    }
  }
}
</style>
