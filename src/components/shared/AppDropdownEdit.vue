<template>
<div>
    <button class="dropdown-button" @click="toggle">
        <span>Ordenar por:</span>
        <i class="fa-solid fa-angle-up" v-if="isOpen"></i>
        <i class="fa-solid fa-angle-down" v-if="!isOpen"></i>
    </button>
    <div class="dropdown" v-show="isOpen">
        <span @click="maisRecente">Edição mais recente</span>
        <span @click="maisAntiga">Edição mais antiga</span>
    </div>
</div>
</template>

<script>

export default {
    data(){
        return {
            isOpen: false
        }
    },

    watch: {
        isOpen(value) {
            if (value) {
                this.emitter.emit('dropdownOpen', this);
            }
        },
    },

    created() {
        this.emitter.on('dropdownOpen', this.rootCloseListener);
    },

    mounted(){
        document.addEventListener("click", this.clickOutListener)
    },
    
    beforeUnmount() {
        document.removeEventListener('click', this.clickOutListener);
    },

    methods: {
        toggle(){
            this.isOpen = !this.isOpen
        },

        close(){
            this.isOpen = false
        },

        clickOutListener(evt){
            if (!this.$el.contains(evt.target)) { // Se clicar no mesmo elemento, não fechar, mas se sim, fechar
                this.close()
            }
        },
        
        rootCloseListener(vm) {
            if (vm !== this) {
                this.close();
            }
        },

        maisRecente(){
            this.$emit("maisRecente")
            this.close();
        },
        
        maisAntiga(){
            this.$emit("maisAntiga")
            this.close();
        }
    }
}
</script>

<style scoped>
div {
    max-width: 150px;
}

.dropdown-button {
    width: 150px;
    display: flex;
    outline: none;
    padding: 4px 12px;
    border-radius: 3px;
    border: 1px solid #ccc;
    align-content: center;
    justify-content: space-between;
}

.dropdown-button span {
    color: black;
    font-weight: bold;
}

.dropdown-button i {
    color: black;
    font-size: 20px;
}

.dropdown {
    width: 150px;
    display: flex;
    margin-top: 5px;
    border-radius: 3px;
    position: absolute;
    flex-direction: column;
    border: 1px solid #ccc;
    background-color: white;
}

.dropdown span {
    padding: 5px 0px;
    color: black;
    font-weight: bold;
}

.dropdown span:hover {
    cursor: pointer;
    background-color: #ccc;
}
</style>