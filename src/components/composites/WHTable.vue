<template>
  <div v-if="$vuetify.breakpoint.smAndUp">
    <v-simple-table fixed-header :height="height" :dense="dense">
      <thead v-if="showHeader" style="line-height:1;">
        <tr style="line-height:1;">
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
        <tr v-for="(item2, key2) in items" :key="key2" :class="key2 === selectedIndex?'whtableselect':'whtabledan'"
          @click="colClicked(key2, item2)">
          <td v-if="showSelect">
            <v-checkbox v-if="!singleSelect" v-model="indexSelected" :value="key2"></v-checkbox>
            <!--when single check, add 1 plus to avoid a bug when key is 0-->
            <v-checkbox v-else v-model="indexSelected" :multiple="false" :value="key2+1"></v-checkbox>
          </td>
          <td v-for="(item3, key3) in headers" :key="key3">
            <template v-if="item3['editable'] && item3.dicMapSource">
              <wh-select :value="getObject(item2, item3)" :items="item3.dicMapSource" item-text="label"
                item-value="value" @change="changeValue($event,key2,key3)" />
            </template>
            <template v-else-if="item3['editable']">
              <v-edit-dialog @save="save(key2, key3)" @cancel="cancel" @open="open(item2, item3)">
                <!-- @close="close"-->
                <template v-slot:default>
                  <span class="whtableedititem">
                    {{getName(item2,item3,key2,key3)}}
                  </span>
                </template>
                <template v-slot:input>
                  <wh-textfield v-model="editValue" single-line counter />
                </template>
              </v-edit-dialog>
            </template>
            <template v-else>
              {{getName(item2,item3,key2,key3)}}
            </template>
          </td>
          <td v-if="actions && actions.length > 0">
            <template v-for="(action, key4) in actions">
              <v-icon v-if="action.icon && action.icon !== ''" @click="$emit(action.actionName, item2, key2)"
                :key="key4">
                {{action.icon}}
              </v-icon>
            </template>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <template v-if="showFooter && (items.length > 0)">
      <slot />
    </template>
  </div>
  <div v-else>
    <v-simple-table fixed-header :height="mobileheight" dense>
      <thead>
        <tr>
          <th v-if="showSelect" style="width: 4%">
            <v-checkbox v-if="!singleSelect" v-model="wholecheckbox"></v-checkbox>
          </th>
          <th>
            列表
          </th>
          <th v-if="mobileExpandable" style="width: 4%">
            折叠
          </th>
          <th v-if="actions && actions.length > 0">
            操作
          </th>
        </tr>
      </thead>
      <tbody class="mx-0 px-0">
        <tr v-for="(item2, key2) in items" :key="key2"
          :class="key2 === selectedIndex?'whtableselect':(key2 % 2 === 0?'whtableshuang':'whtabledan')"
          @click="colClicked(key2, item2)">
          <td v-if="showSelect" style="width: 8%">
            <v-checkbox v-if="!singleSelect" v-model="indexSelected" :value="key2"></v-checkbox>
            <!--when single check, add 1 plus to avoid a bug when key is 0-->
            <v-checkbox v-else v-model="indexSelected" :multiple="false" :value="key2+1"></v-checkbox>
          </td>
          <td>
            <v-container transition="scroll-y-transition">
              <v-row v-for="(item3, key3) in headers" :key="key3">
                <template v-if="item3['editable'] && item3.dicMapSource && rowShow(key2,key3)">
                  <wh-select :label="item3.text" :value="getObject(item2, item3)" :items="item3.dicMapSource"
                    item-text="label" item-value="value" @change="changeValue($event,key2,key3)" />
                </template>
                <template v-else-if="item3['editable'] && rowShow(key2,key3)">
                  <v-edit-dialog @save="save(key2, key3)" @cancel="cancel" @open="open(item2, item3)">
                    <template v-slot:default>
                      <wh-textfield color="green" :label="item3.text" :value="getName(item2,item3,key2,key3)" readonly />
                    </template>
                    <template v-slot:input>
                      <wh-textfield v-model="editValue" single-line counter />
                    </template>
                  </v-edit-dialog>
                </template>
                <template v-else-if="rowShow(key2,key3)">
                  <wh-textfield :label="item3.text" :value="getName(item2,item3,key2,key3)" disabled />
                </template>
                <template v-else>
                </template>
              </v-row>
            </v-container>
          </td>
          <td v-if="mobileExpandable" style="width: 4%">
            <v-icon @click="clickExpanded(key2)" color="blue">
              {{items[key2].isMobileExpand?'mdi-chevron-double-up':'mdi-chevron-double-down'}}
            </v-icon>
          </td>
          <td v-if="actions && actions.length > 0" style="width: 20%">
            <template v-for="(action, key4) in actions">
              <v-icon v-if="action.icon && action.icon !== ''" @click="$emit(action.actionName, item2, key2)"
                :key="key4">
                {{action.icon}}
              </v-icon>
            </template>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <template v-if="showFooter && (items.length > 0)">
      <slot />
    </template>
  </div>
</template>
<script>
  import {
    access
  } from 'fs';
  import {
    setTimeout
  } from 'timers';
  export default {
    name: 'wh-table',
    data() {
      return {
        // selectedIndex: 1,
        selectedIndex: -1,
        wholecheckbox: false,
        indexSelected: [],
        editValue: '',
        page: 1,
        //默认变量
        displayCountWhenUnExpanded: 3
      }
    },
    props: {
      showHeader: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      dense: {
        type: Boolean,
        default: true
      },
      mobileExpandable: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '300px'
      },
      mobileheight: {
        type: String,
        default: '600px'
      },
      headers: {
        // support ability: text,value,width,align,editable
        type: Array,
        default () {
          return []
        }
      },
      items: {
        type: Array,
        default () {
          return []
        }
      },
      actions: {
        type: Array,
        default () {
          return []
        }
      },
      showSelect: {
        type: Boolean,
        default: false
      },
      singleSelect: {
        type: Boolean,
        default: true
      },
      formatter: {
        type: Function
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
          this.$emit('item-selected', this.items[to - 1], to - 1);
        } else {
          let array = []
          for (let i in to) {
            array.push(this.items[to[i]])
          }
          this.$emit('item-selected', array, to);
        }
      }
    },
    methods: {
      getName(item2,item3,key2,key3) {
        let value = item2[item3.value]
        if (item3.dicMapSource) {
          for (let i in item3.dicMapSource) {
            if (value + '' === item3.dicMapSource[i].value) {
              value = item3.dicMapSource[i].label
              return value
            }
          }
        }
        // no dic for translate, may it have a formmater.
        if (this.formatter) {
          let row = item2
          let column = item3.value
          let index = key2
          return this.formatter(row, column, value, index);
        }
        return value
      },
      getObject(item2, item3) {
        let value = item2[item3.value]
        if (item3.dicMapSource) {
          for (let i in item3.dicMapSource) {
            if (value + '' === item3.dicMapSource[i].value) {
              return item3.dicMapSource[i]
            }
          }
        }
        return {
          label: 'labelerror',
          value: 'valueerror'
        }
      },
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
      },
      rowShow(key2, key3) {
        if (!this.mobileExpandable)
          return true
        // console.log('rowShow;::::', this.items[key2].isMobileExpand);
        if (this.items[key2].isMobileExpand)
          return true
        return key3 < this.displayCountWhenUnExpanded
      },
      clickExpanded(key) {
        let cacheObject = this.items[key];
        if (cacheObject.isMobileExpand) {
          cacheObject.isMobileExpand = false
          this.$set(this.items, key, cacheObject)
        } else {
          // this.items[key].isMobileExpand = false
          cacheObject.isMobileExpand = true
          this.$set(this.items, key, cacheObject)
        }
      },
      changeValue(value, key2, key3) {
        console.log('select changed.....', value, key2, key3);
        this.editValue = value
        this.$emit('inline-edit', key2, key3, value);
      }
    }
  }
</script>