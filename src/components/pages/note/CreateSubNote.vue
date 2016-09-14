<template>
  <div class="sub-note-container">
    <form accept-charset="UTF-8" action="/JeOam/2e9388481a1c7388048e/create-subnote" data-type="json" method="post">
      <div class="write-sub-note">
        <textarea placeholder="Append a note" aria-label="Note body"></textarea>
            <p class="drag-and-drop"></p>
            <div class="form-action">
              <button type="submit" class="append-btn">Append</button>
            </div>
          </div>
        </form>
      </div>
</template>
<script>
</script>

<style scoped>
.sub-note-container {
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 20px 20px 20px 20px;
}

.write-sub-note {
  padding: 10px 15px 10px 10px;
}

.write-sub-note > textarea {
  display: block;
  width: 100%;
  min-height: 100px;
  max-height: 500px;
  resize: vertical;
  background-color: #fafafa;
  border: 1px solid #ccc;
}
.append-btn {
  float: right;
  color: #fff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
  background-color: #60b044;
  background-image: -webkit-linear-gradient(#8add6d, #60b044);
  background-image: linear-gradient(#8add6d, #60b044);
  border-color: #5ca941;
  position: relative;
  display: inline-block;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: bold;
  line-height: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  -webkit-user-select: none;
  -webkit-appearance: none;

}
</style>
