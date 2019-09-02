<template>
  <div v-if="$vuetify.breakpoint.smAndUp">
    <v-simple-table fixed-header :height="height" :dense="dense">
      <thead v-if="showHeader">
        <tr>
          <th v-if="showSelect" style="width: 5%">
            <v-checkbox v-if="!singleSelect" v-model="wholecheckbox"></v-checkbox>
          </th>
          <th v-for="(item, key) in headers" :key="key">
            {{item.text}}
          </th>
          <th v-if="actions && actions.length > 0">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item2, key2) in items" :key="key2"
          :style="key2 === selectedIndex?{'background-color': 'skyblue'}:{}" @click="colClicked(key2, item2)">
          <td v-if="showSelect">
            <v-checkbox v-if="!singleSelect" v-model="indexSelected" :value="key2"></v-checkbox>
            <!--when single check, add 1 plus to avoid a bug when key is 0-->
            <v-checkbox v-else v-model="indexSelected" :multiple="false" :value="key2+1"></v-checkbox>
          </td>
          <td v-for="(item3, key3) in headers" :key="key3">
            <template v-if="item3['editable']">
              <v-edit-dialog @save="save(key2, key3)" @cancel="cancel" @open="open(item2, item3)">
                <!-- @close="close"-->
                <template v-slot:default>
                  <span style="color: blue">
                    {{item2[item3.value]}}
                  </span>
                </template>
                <template v-slot:input>
                  <wh-textfield v-model="editValue" single-line counter />
                </template>
              </v-edit-dialog>
            </template>
            <template v-else>
              {{item2[item3.value]}}
            </template>
          </td>
          <td v-if="actions && actions.length > 0">
            <template v-for="(action, key4) in actions">
              <wh-btn class="mb-2" :key="key4" @click="$emit(action.actionName, item2, key2)">
                <v-icon v-if="action.icon && action.icon !== ''">
                  {{action.icon}}
                </v-icon>
                <template v-if="action.text && action.text !== ''">
                  {{action.text}}
                </template>
              </wh-btn>
            </template>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <wh-pagination v-if="items.length > 0" v-model="page" :length="10"></wh-pagination>
  </div>
  <div v-else>
    <v-simple-table fixed-header :height="height" dense>
      <thead>
        <tr>
          <th v-if="showSelect" style="width: 5%">
            <v-checkbox v-if="!singleSelect" v-model="wholecheckbox"></v-checkbox>
          </th>
          <th>
            列表
          </th>
          <th v-if="actions && actions.length > 0">
            操作
          </th>
        </tr>
      </thead>
      <tbody class="mx-0 px-0">
        <tr v-for="(item2, key2) in items" :key="key2"
          :style="key2 === selectedIndex?{'background-color': 'skyblue'}:{}" @click="colClicked(key2, item2)">
          <td v-if="showSelect">
            <v-checkbox v-if="!singleSelect" v-model="indexSelected" :value="key2"></v-checkbox>
            <!--when single check, add 1 plus to avoid a bug when key is 0-->
            <v-checkbox v-else v-model="indexSelected" :multiple="false" :value="key2+1"></v-checkbox>
          </td>
          <td>
            <v-container>
              <v-row v-for="(item3, key3) in headers" :key="key3">
                <template v-if="item3['editable']">
                  <v-edit-dialog @save="save(key2, key3)" @cancel="cancel" @open="open(item2, item3)">
                    <template v-slot:default>
                      <wh-textfield color="green" :label="item3.text" v-model="item2[item3.value]" readonly />
                    </template>
                    <template v-slot:input>
                      <wh-textfield v-model="editValue" single-line counter />
                    </template>
                  </v-edit-dialog>
                </template>
                <template v-else>
                  <wh-textfield :label="item3.text" v-model="item2[item3.value]" readonly />
                </template>
              </v-row>
            </v-container>
          </td>
          <td v-if="actions && actions.length > 0">
            <template v-for="(action, key4) in actions">
              <wh-btn class="mb-2" :key="key4" @click="$emit(action.actionName, item2, key2)">
                <v-icon v-if="action.icon && action.icon !== ''">
                  {{action.icon}}
                </v-icon>
                <template v-if="action.text && action.text !== ''">
                  {{action.text}}
                </template>
              </wh-btn>
            </template>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <wh-pagination v-if="showFooter && items.length > 0" v-model="page" :length="10"></wh-pagination>
  </div>
</template>

<script>
  import {
    access
  } from 'fs';
  export default {
    name: 'wh-table',
    props: {
      showHeader: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // selectedIndex: 1,
        selectedIndex: -1,
        wholecheckbox: false,
        indexSelected: [],
        editValue: '',
        page: 1
      }
    },
    props: {
      dense: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '300px'
      },
      headers: {
        // support ability: text,value,width,align,editable
        type: Array,
        default: []
      },
      items: {
        type: Array,
        default: []
      },
      actions: {
        type: Array,
        default: []
      },
      showSelect: {
        type: Boolean,
        default: false
      },
      singleSelect: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      tableWholeArray() {
        let array = []
        for (let i = 0; i <= this.items.length - 1; i++) {
          array.push(i)
        }
        return array
      }
    },
    watch: {
      wholecheckbox(to, from) {
        if (this.singleSelect) {
          //do nothing...
          return;
        }
        console.log('whole checked....', to);
        if (to) {
          this.indexSelected = this.tableWholeArray;
        } else {
          this.indexSelected = [];
        }
      },
      indexSelected(to, from) {
        if (this.singleSelect) {
          this.$emit('item-selected', items[to - 1], to - 1);
        } else {
          this.$emit('item-selected', '', to);
        }
      }
    },
    methods: {
      save(key2, key3) {
        console.log('aItem saved', key2, key3, this.editValue);
        this.$emit('inline-edit', key2, key3, this.editValue);
      },
      cancel(event) {
        console.log('aItem canceled', event);
      },
      open(item2, item3) {
        this.editValue = item2[item3['value']]
      },
      close(event) {
        console.log('aItem closed', event);
      },
      colClicked(aCol, aitem) {
        this.selectedIndex = aCol
        this.$emit('click:row', aitem, aCol);
      }
    }
  }
</script>