<template>
  <div class="flex gap-12 mt-20 justify-center">
    <div>
      <button
        :disabled="currentPage === 1"
        @click="pageChanged(1)"
      >First Page
      </button>
      <button
        :disabled="currentPage === 1" 
        @click="pageChanged(currentPage - 1)"
      >Prev
      </button>
    </div>

    <ul class="flex items-center justify-center">
      <li v-for="pageNumber in pages" :key="pageNumber" :class="{ active: pageNumber === currentPage }">
        <a
          href="#"
          @click.prevent="pageChanged(pageNumber)"
          :class="{ active: pageNumber === currentPage }"
        >
          {{ pageNumber }}
        </a>
      </li>
    </ul>
    
    <div>
      <button 
        :disabled="currentPage === totalPages" 
        @click="pageChanged(currentPage + 1)"
      >Next
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="pageChanged(totalPages)"
      >Last Page
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  computed: {
    page() {
      return this.currentPage;
    },
    pages() {
      const range = Math.ceil(this.maxVisiblePages / 2);
      let start = Math.max(this.page - range, 1);
      let end = Math.min(this.page + range, this.totalPages);

      if (end - start < this.maxVisiblePages) {
        if (start === 1) {
          end = Math.min(this.maxVisiblePages, this.totalPages);
        } else {
          start = Math.max(end - this.maxVisiblePages, 1);
        }
      }

      return Array(end - start + 1)
        .fill()
        .map((_, i) => start + i);
    }
  },
  methods: {
    pageChanged(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.$emit("page-changed", pageNumber);
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.goToPage(this.page - 1);
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.goToPage(this.page + 1);
      }
    }
  }
};
</script>

<style scoped>
button {
  padding: 5px 10px;
  margin: 5px;
  border: 1px solid #E5E7EB;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
  min-width: 100px;
}

button[disabled] {
  opacity: 0.5;
  cursor: default;
}

button.active {
  background-color: #ddd;
}

li {
  margin-bottom: 0;
  padding: 0;
  font-size: 1rem;
  margin-right: 4px;
}

li a {
  display: inline-block;
  padding: 5px 10px;
  min-width: 30px;
  text-align: center;
}

li:last-child {
  margin-right: 0;
}

li.active {
  border-color: #838383;
}

button:not([disabled]):hover,
li:hover {
  border-color: #838383;
}
</style>