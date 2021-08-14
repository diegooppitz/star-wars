import _ from 'lodash';

const mixin = {
  data() {
    return {
      isEmpty: false,
      hasError: false,
      loading: false,
    };
  },
  methods: {
    /**
     * @description Checks the current state is: 'done', 'loading', 'with a error' or 'is empty'.
     */
    $_verifyLoaded(verify) {
      switch (verify) {
        case 'done':
          return !this.hasError && !this.loading && !this.isEmpty;
        case 'loading':
          return this.loading;
        case 'info':
          return !this.loading && (this.hasError || this.isEmpty);
        default:
          this.hasError = true;
          return false;
      }
    },

    $_verifyLoadedVuex(verify) {
      switch (verify) {
        case 'done':
          return !this.getIsEmpty && !this.getHasError && !this.getLoading;
        case 'loading':
          return this.getLoading;
        case 'info':
          return !this.getLoading && (this.getHasError || this.getIsEmpty);
        default:
          this.getHasError = true;
          return false;
      }
    },

    /**
     * @description First pattern test, checks if the card has data
     */
    $_verifyData(data) {
      this.isEmpty = _.isEmpty(data);
      if (this.isEmpty) {
        this.$_componentHeight();
        this.loading = false;
      }
      return this.isEmpty;
    },

    $_reqConfig() {
      this.loading = true;
      this.hasError = false;
      this.isEmpty = false;
    },
  },
};

export default mixin;
