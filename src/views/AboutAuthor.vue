<template>
    <div class="about-author">
        <section class="author-introduction">
            <h2>Introduction</h2>
            <p>Brief introduction about the author.</p>
        </section>

        <section class="author-background">
            <h2>Background</h2>
            <p>Details about the author's background and experience.</p>
        </section>

        <section class="author-achievements">
            <h2>Achievements</h2>
            <p>List of the author's notable achievements.</p>
        </section>

        <section class="author-contact">
            <h2>Contact</h2>
            <p>Information on how to contact the author.</p>
        </section>
    </div>
</template>

<script>
export default {
    name: "AboutAuthor",
};
</script>

<style scoped>
.about-author {
    padding: 20px;
}

section {
    margin-bottom: 20px;
}
</style>