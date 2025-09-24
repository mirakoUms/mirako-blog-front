<template>
  <div class="index-page">
    <header class="header">
      <nav class="nav" :class="{ 'nav-collapsed': isNavCollapsed }">
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Posts</a>
        <a href="#" class="nav-link">Projects</a>
      </nav>
    </header>

    <main class="main-content">
      <section class="author-info">
        <h2>About the Author</h2>
        <p>Hello! I'm Mirako, a passionate developer and blogger. I love sharing knowledge and exploring new technologies.</p>
        <p>Feel free to connect with me and explore my projects!</p>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2023 Mirako Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavCollapsed: true,
    };
  },
  methods: {
    toggleNav() {
      this.isNavCollapsed = !this.isNavCollapsed;
    },
  },
};
</script>

<style scoped>
.index-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #fff;
  background-color: #121212;
  margin: 0;
  padding: 0;
}

.header {
  background-color: #000;
  padding: 1rem;
  text-align: center;
  position: relative;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  transition: max-height 0.3s ease;
}

.nav-collapsed {
  max-height: 0;
  overflow: hidden;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
}

.nav-link:hover {
  text-decoration: underline;
}

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.author-info {
  max-width: 600px;
}

.author-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.author-info p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 1rem;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav {
    flex-direction: column;
    gap: 0.5rem;
    max-height: 0;
    overflow: hidden;
  }

  .nav:not(.nav-collapsed) {
    max-height: 200px; /* Adjust based on the number of links */
  }

  .author-info {
    padding: 1rem;
  }
}

/* Add this to ensure nav is always visible on wide screens */
@media (min-width: 769px) {
  .nav {
    max-height: none;
    overflow: visible;
  }

  .menu-toggle {
    display: none;
  }
}
</style>
