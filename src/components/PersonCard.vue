<template>
  <el-card :body-style="{ padding: 0 }" class="person-card">
    <div class="person-card__image-wrapper">
      <img :src="image">
    </div>
    <div class="person-card__body">
      <div class="person-card__body__title">
        {{ name }}
      </div>
      <div class="person-card__body__gender">
        {{ gender }}
      </div>
      <div class="person-card__body__height">
        {{ height }} cm
      </div>
      <div class="person-card__body__weight">
        {{ mass }} kg
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PersonCard',
  props: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    mass: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.person-card {
  border: 0;
  border-radius: 6px;

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
      background-color: rgba(0, 0, 0, 0.3);
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

    &__height, &__gender {
      margin-bottom: 5px;
    }
  }
}
</style>
