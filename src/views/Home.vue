<template>
    <header class="header">
      <div class="back" @click="goBack">〈</div>
      <h1>保护环境 人人有责</h1>
    </header>
    <Swiper/>

  <!-- 公告部分，使用水平滚动 -->
  <div class="announcement">
    <div class="announcement-content">
        <span v-for="announcement in announcements" :key="announcement.id">
          {{ announcement.text }}
        </span>
    </div>
  </div>


  <div class="card-container">
    <div class="selection-area">
      <div class="select-group">
        <label for="province-select">所在省：</label>
        <select id="province-select" v-model="selectedProvince" @change="updateCities">
          <option disabled value="">请选择省份</option>
          <option v-for="option in provinceAndCityOption" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="select-group">
        <label for="city-select">所在市：</label>
        <select id="city-select" v-model="selectedCity">
          <option disabled value="">请选择市区</option>
          <option v-for="option in cities" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <label for="detailed-address">具体地址：</label>
        <input id="detailed-address" type="text" v-model="detailAddress" @input="handleAddressInput" placeholder="输入具体地址">
      </div>
      <!-- 添加下一步按钮 -->
      <button @click="goNextPage">下一步</button>
    </div>
  </div>

</template>

<script>


import {onMounted, ref} from 'vue';
import {  useRouter,useRoute } from 'vue-router';
import Swiper from "../components/Swiper.vue";



export default {
  components: {Swiper},




  setup() {
    const router = useRouter();
    const route =useRoute();

    let userId = localStorage.getItem('userId');// 获取用户ID
    console.log('home获取到的userid:',userId)


    const announcements = ref([
      { id: 1, text: "重要公告📢：近日多地出现空气质量问题，请各位监督员们多加留意！" },

    ]);

    // 模拟公告滚动效果
    const rotateAnnouncements = () => {
      setInterval(() => {
        const firstAnnouncement = announcements.value.shift();
        announcements.value.push(firstAnnouncement);
      }, 3000); // 每3秒滚动一次
    };

    onMounted(() => {
      rotateAnnouncements();
    });






    const provinceAndCityOption = ref([
      {
        value: '',
        label: '全部'
      },
      {
        value: '1',
        label: '北京市',
        children: [
          {
            value: '1-1',
            label: '北京市'
          }
        ]
      },
      {
        value: '2',
        label: '天津市',
        children: [
          {
            value: '2-1',
            label: '天津市'
          }
        ]
      },
      {
        value: '3',
        label: '河北省',
        children: [
          { value: '3-1', label: '石家庄市' },
          { value: '3-2', label: '唐山市' },
          { value: '3-3', label: '秦皇岛市' },
          { value: '3-4', label: '邯郸市' },
          { value: '3-5', label: '邢台市' },
          { value: '3-6', label: '保定市' },
          { value: '3-7', label: '张家口市' },
          { value: '3-8', label: '承德市' },
          { value: '3-9', label: '沧州市' },
          { value: '3-10', label: '廊坊市' },
          { value: '3-11', label: '衡水市' }
        ]
      },
      {
        value: '4',
        label: '山西省',
        children: [
          { value: '4-1', label: '太原市' },
          { value: '4-2', label: '大同市' },
          { value: '4-3', label: '阳泉市' },
          { value: '4-4', label: '长治市' },
          { value: '4-5', label: '晋城市' },
          { value: '4-6', label: '朔州市' },
          { value: '4-7', label: '晋中市' },
          { value: '4-8', label: '运城市' },
          { value: '4-9', label: '忻州市' },
          { value: '4-10', label: '临汾市' },
          { value: '4-11', label: '吕梁市' }
        ]
      },
      {
        value: '5',
        label: '内蒙古自治区',
        children: [
          { value: '5-1', label: '呼和浩特市' },
          { value: '5-2', label: '包头市' },
          { value: '5-3', label: '乌海市' },
          { value: '5-4', label: '赤峰市' },
          { value: '5-5', label: '通辽市' },
          { value: '5-6', label: '鄂尔多斯市' },
          { value: '5-7', label: '呼伦贝尔市' },
          { value: '5-8', label: '巴彦淖尔市' },
          { value: '5-9', label: '乌兰察布市' },
          { value: '5-10', label: '兴安盟' },
          { value: '5-11', label: '锡林郭勒盟' },
          { value: '5-12', label: '阿拉善盟' }
        ]
      },
      {
        value: '6',
        label: '辽宁省',
        children: [
          { value: '6-1', label: '沈阳市' },
          { value: '6-2', label: '大连市' },
          { value: '6-3', label: '鞍山市' },
          { value: '6-4', label: '抚顺市' },
          { value: '6-5', label: '本溪市' },
          { value: '6-6', label: '丹东市' },
          { value: '6-7', label: '锦州市' },
          { value: '6-8', label: '营口市' },
          { value: '6-9', label: '阜新市' },
          { value: '6-10', label: '辽阳市' },
          { value: '6-11', label: '盘锦市' },
          { value: '6-12', label: '铁岭市' },
          { value: '6-13', label: '朝阳市' },
          { value: '6-14', label: '葫芦岛市' }
        ]
      },
      {
        value: '7',
        label: '吉林省',
        children: [
          { value: '7-1', label: '长春市' },
          { value: '7-2', label: '吉林市' },
          { value: '7-3', label: '四平市' },
          { value: '7-4', label: '辽源市' },
          { value: '7-5', label: '通化市' },
          { value: '7-6', label: '白山市' },
          { value: '7-7', label: '松原市' },
          { value: '7-8', label: '白城市' },
          { value: '7-9', label: '延边朝鲜族自治州' }
        ]
      },
      {
        value: '8',
        label: '黑龙江省',
        children: [
          { value: '8-1', label: '哈尔滨市' },
          { value: '8-2', label: '齐齐哈尔市' },
          { value: '8-3', label: '鸡西市' },
          { value: '8-4', label: '鹤岗市' },
          { value: '8-5', label: '双鸭山市' },
          { value: '8-6', label: '大庆市' },
          { value: '8-7', label: '伊春市' },
          { value: '8-8', label: '佳木斯市' },
          { value: '8-9', label: '七台河市' },
          { value: '8-10', label: '牡丹江市' },
          { value: '8-11', label: '黑河市' },
          { value: '8-12', label: '绥化市' },
          { value: '8-13', label: '大兴安岭地区' }
        ]
      },
      {
        value: '9',
        label: '上海市',
        children: [
          {
            value: '9-1',
            label: '上海市'
          }
        ]
      },
      {
        value: '10',
        label: '江苏省',
        children: [
          { value: '10-1', label: '南京市' },
          { value: '10-2', label: '无锡市' },
          { value: '10-3', label: '徐州市' },
          { value: '10-4', label: '常州市' },
          { value: '10-5', label: '苏州市' },
          { value: '10-6', label: '南通市' },
          { value: '10-7', label: '连云港市' },
          { value: '10-8', label: '淮安市' },
          { value: '10-9', label: '盐城市' },
          { value: '10-10', label: '扬州市' },
          { value: '10-11', label: '镇江市' },
          { value: '10-12', label: '泰州市' },
          { value: '10-13', label: '宿迁市' }
        ]
      },
      {
        value: '11',
        label: '浙江省',
        children: [
          { value: '11-1', label: '杭州市' },
          { value: '11-2', label: '宁波市' },
          { value: '11-3', label: '温州市' },
          { value: '11-4', label: '嘉兴市' },
          { value: '11-5', label: '湖州市' },
          { value: '11-6', label: '绍兴市' },
          { value: '11-7', label: '金华市' },
          { value: '11-8', label: '衢州市' },
          { value: '11-9', label: '舟山市' },
          { value: '11-10', label: '台州市' },
          { value: '11-11', label: '丽水市' }
        ]
      },
      {
        value: '12',
        label: '安徽省',
        children: [
          { value: '12-1', label: '合肥市' },
          { value: '12-2', label: '芜湖市' },
          { value: '12-3', label: '蚌埠市' },
          { value: '12-4', label: '淮南市' },
          { value: '12-5', label: '马鞍山市' },
          { value: '12-6', label: '淮北市' },
          { value: '12-7', label: '铜陵市' },
          { value: '12-8', label: '安庆市' },
          { value: '12-9', label: '黄山市' },
          { value: '12-10', label: '滁州市' },
          { value: '12-11', label: '阜阳市' },
          { value: '12-12', label: '宿州市' },
          { value: '12-13', label: '六安市' },
          { value: '12-14', label: '亳州市' },
          { value: '12-15', label: '池州市' },
          { value: '12-16', label: '宣城市' }
        ]
      },
      {
        value: '13',
        label: '福建省',
        children: [
          { value: '13-1', label: '福州市' },
          { value: '13-2', label: '厦门市' },
          { value: '13-3', label: '莆田市' },
          { value: '13-4', label: '三明市' },
          { value: '13-5', label: '泉州市' },
          { value: '13-6', label: '漳州市' },
          { value: '13-7', label: '南平市' },
          { value: '13-8', label: '龙岩市' },
          { value: '13-9', label: '宁德市' }
        ]
      },
      {
        value: '14',
        label: '江西省',
        children: [
          { value: '14-1', label: '南昌市' },
          { value: '14-2', label: '景德镇市' },
          { value: '14-3', label: '萍乡市' },
          { value: '14-4', label: '九江市' },
          { value: '14-5', label: '新余市' },
          { value: '14-6', label: '鹰潭市' },
          { value: '14-7', label: '赣州市' },
          { value: '14-8', label: '吉安市' },
          { value: '14-9', label: '宜春市' },
          { value: '14-10', label: '抚州市' },
          { value: '14-11', label: '上饶市' }
        ]
      },
      {
        value: '15',
        label: '山东省',
        children: [
          { value: '15-1', label: '济南市' },
          { value: '15-2', label: '青岛市' },
          { value: '15-3', label: '淄博市' },
          { value: '15-4', label: '枣庄市' },
          { value: '15-5', label: '东营市' },
          { value: '15-6', label: '烟台市' },
          { value: '15-7', label: '潍坊市' },
          { value: '15-8', label: '济宁市' },
          { value: '15-9', label: '泰安市' },
          { value: '15-10', label: '威海市' },
          { value: '15-11', label: '日照市' },
          { value: '15-12', label: '莱芜市' },
          { value: '15-13', label: '临沂市' },
          { value: '15-14', label: '德州市' },
          { value: '15-15', label: '聊城市' },
          { value: '15-16', label: '滨州市' },
          { value: '15-17', label: '菏泽市' }
        ]
      },
      {
        value: '16',
        label: '河南省',
        children: [
          { value: '16-1', label: '郑州市' },
          { value: '16-2', label: '开封市' },
          { value: '16-3', label: '洛阳市' },
          { value: '16-4', label: '平顶山市' },
          { value: '16-5', label: '安阳市' },
          { value: '16-6', label: '鹤壁市' },
          { value: '16-7', label: '新乡市' },
          { value: '16-8', label: '焦作市' },
          { value: '16-9', label: '濮阳市' },
          { value: '16-10', label: '许昌市' },
          { value: '16-11', label: '漯河市' },
          { value: '16-12', label: '三门峡市' },
          { value: '16-13', label: '南阳市' },
          { value: '16-14', label: '商丘市' },
          { value: '16-15', label: '信阳市' },
          { value: '16-16', label: '周口市' },
          { value: '16-17', label: '驻马店市' },
          { value: '16-18', label: '济源市' }
        ]
      },
      {
        value: '17',
        label: '湖北省',
        children: [
          { value: '17-1', label: '武汉市' },
          { value: '17-2', label: '黄石市' },
          { value: '17-3', label: '十堰市' },
          { value: '17-4', label: '宜昌市' },
          { value: '17-5', label: '襄阳市' },
          { value: '17-6', label: '鄂州市' },
          { value: '17-7', label: '荆门市' },
          { value: '17-8', label: '孝感市' },
          { value: '17-9', label: '荆州市' },
          { value: '17-10', label: '黄冈市' },
          { value: '17-11', label: '咸宁市' },
          { value: '17-12', label: '随州市' },
          { value: '17-13', label: '恩施土家族苗族自治州' },
          { value: '17-14', label: '仙桃市' },
          { value: '17-15', label: '潜江市' },
          { value: '17-16', label: '天门市' },
          { value: '17-17', label: '神农架林区' }
        ]
      },
      {
        value: '18',
        label: '湖南省',
        children: [
          { value: '18-1', label: '长沙市' },
          { value: '18-2', label: '株洲市' },
          { value: '18-3', label: '湘潭市' },
          { value: '18-4', label: '衡阳市' },
          { value: '18-5', label: '邵阳市' },
          { value: '18-6', label: '岳阳市' },
          { value: '18-7', label: '常德市' },
          { value: '18-8', label: '张家界市' },
          { value: '18-9', label: '益阳市' },
          { value: '18-10', label: '郴州市' },
          { value: '18-11', label: '永州市' },
          { value: '18-12', label: '怀化市' },
          { value: '18-13', label: '娄底市' },
          { value: '18-14', label: '湘西土家族苗族自治州' }
        ]
      },
      {
        value: '19',
        label: '广东省',
        children: [
          { value: '19-1', label: '广州市' },
          { value: '19-2', label: '韶关市' },
          { value: '19-3', label: '深圳市' },
          { value: '19-4', label: '珠海市' },
          { value: '19-5', label: '汕头市' },
          { value: '19-6', label: '佛山市' },
          { value: '19-7', label: '江门市' },
          { value: '19-8', label: '湛江市' },
          { value: '19-9', label: '茂名市' },
          { value: '19-10', label: '肇庆市' },
          { value: '19-11', label: '惠州市' },
          { value: '19-12', label: '梅州市' },
          { value: '19-13', label: '汕尾市' },
          { value: '19-14', label: '河源市' },
          { value: '19-15', label: '阳江市' },
          { value: '19-16', label: '清远市' },
          { value: '19-17', label: '东莞市' },
          { value: '19-18', label: '中山市' },
          { value: '19-19', label: '潮州市' },
          { value: '19-20', label: '揭阳市' },
          { value: '19-21', label: '云浮市' }
        ]
      },
      {
        value: '20',
        label: '广西壮族自治区',
        children: [
          { value: '20-1', label: '南宁市' },
          { value: '20-2', label: '柳州市' },
          { value: '20-3', label: '桂林市' },
          { value: '20-4', label: '梧州市' },
          { value: '20-5', label: '北海市' },
          { value: '20-6', label: '防城港市' },
          { value: '20-7', label: '钦州市' },
          { value: '20-8', label: '贵港市' },
          { value: '20-9', label: '玉林市' },
          { value: '20-10', label: '百色市' },
          { value: '20-11', label: '贺州市' },
          { value: '20-12', label: '河池市' },
          { value: '20-13', label: '来宾市' },
          { value: '20-14', label: '崇左市' }
        ]
      },
      {
        value: '21',
        label: '海南省',
        children: [
          { value: '21-1', label: '海口市' },
          { value: '21-2', label: '三亚市' },
          { value: '21-3', label: '三沙市' },
          { value: '21-4', label: '儋州市' },
          { value: '21-5', label: '五指山市' },
          { value: '21-6', label: '琼海市' },
          { value: '21-7', label: '文昌市' },
          { value: '21-8', label: '万宁市' },
          { value: '21-9', label: '东方市' },
          { value: '21-10', label: '定安县' },
          { value: '21-11', label: '屯昌县' },
          { value: '21-12', label: '澄迈县' },
          { value: '21-13', label: '临高县' },
          { value: '21-14', label: '白沙黎族自治县' },
          { value: '21-15', label: '昌江黎族自治县' },
          { value: '21-16', label: '乐东黎族自治县' },
          { value: '21-17', label: '陵水黎族自治县' },
          { value: '21-18', label: '保亭黎族苗族自治县' },
          { value: '21-19', label: '琼中黎族苗族自治县' }
        ]
      },
      {
        value: '22',
        label: '重庆市',
        children: [
          {
            value: '22-1',
            label: '重庆市'
          }
        ]
      },
      {
        value: '23',
        label: '四川省',
        children: [
          { value: '23-1', label: '成都市' },
          { value: '23-2', label: '自贡市' },
          { value: '23-3', label: '攀枝花市' },
          { value: '23-4', label: '泸州市' },
          { value: '23-5', label: '德阳市' },
          { value: '23-6', label: '绵阳市' },
          { value: '23-7', label: '广元市' },
          { value: '23-8', label: '遂宁市' },
          { value: '23-9', label: '内江市' },
          { value: '23-10', label: '乐山市' },
          { value: '23-11', label: '南充市' },
          { value: '23-12', label: '眉山市' },
          { value: '23-13', label: '宜宾市' },
          { value: '23-14', label: '广安市' },
          { value: '23-15', label: '达州市' },
          { value: '23-16', label: '雅安市' },
          { value: '23-17', label: '巴中市' },
          { value: '23-18', label: '资阳市' },
          { value: '23-19', label: '阿坝藏族羌族自治州' },
          { value: '23-20', label: '甘孜藏族自治州' },
          { value: '23-21', label: '凉山彝族自治州' }
        ]
      },
      {
        value: '24',
        label: '贵州省',
        children: [
          { value: '24-1', label: '贵阳市' },
          { value: '24-2', label: '六盘水市' },
          { value: '24-3', label: '遵义市' },
          { value: '24-4', label: '安顺市' },
          { value: '24-5', label: '毕节市' },
          { value: '24-6', label: '铜仁市' },
          { value: '24-7', label: '黔西南布依族苗族自治州' },
          { value: '24-8', label: '黔东南苗族侗族自治州' },
          { value: '24-9', label: '黔南布依族苗族自治州' }
        ]
      },
      {
        value: '25',
        label: '云南省',
        children: [
          { value: '25-1', label: '昆明市' },
          { value: '25-2', label: '曲靖市' },
          { value: '25-3', label: '玉溪市' },
          { value: '25-4', label: '保山市' },
          { value: '25-5', label: '昭通市' },
          { value: '25-6', label: '丽江市' },
          { value: '25-7', label: '普洱市' },
          { value: '25-8', label: '临沧市' },
          { value: '25-9', label: '楚雄彝族自治州' },
          { value: '25-10', label: '红河哈尼族彝族自治州' },
          { value: '25-11', label: '文山壮族苗族自治州' },
          { value: '25-12', label: '西双版纳傣族自治州' },
          { value: '25-13', label: '大理白族自治州' },
          { value: '25-14', label: '德宏傣族景颇族自治州' },
          { value: '25-15', label: '怒江傈僳族自治州' },
          { value: '25-16', label: '迪庆藏族自治州' }
        ]
      },
      {
        value: '26',
        label: '西藏自治区',
        children: [
          { value: '26-1', label: '拉萨市' },
          { value: '26-2', label: '日喀则市' },
          { value: '26-3', label: '昌都市' },
          { value: '26-4', label: '林芝市' },
          { value: '26-5', label: '山南市' },
          { value: '26-6', label: '那曲市' },
          { value: '26-7', label: '阿里地区' }
        ]
      },
      {
        value: '27',
        label: '陕西省',
        children: [
          { value: '27-1', label: '西安市' },
          { value: '27-2', label: '铜川市' },
          { value: '27-3', label: '宝鸡市' },
          { value: '27-4', label: '咸阳市' },
          { value: '27-5', label: '渭南市' },
          { value: '27-6', label: '延安市' },
          { value: '27-7', label: '汉中市' },
          { value: '27-8', label: '榆林市' },
          { value: '27-9', label: '安康市' },
          { value: '27-10', label: '商洛市' }
        ]
      },
      {
        value: '28',
        label: '甘肃省',
        children: [
          { value: '28-1', label: '兰州市' },
          { value: '28-2', label: '嘉峪关市' },
          { value: '28-3', label: '金昌市' },
          { value: '28-4', label: '白银市' },
          { value: '28-5', label: '天水市' },
          { value: '28-6', label: '武威市' },
          { value: '28-7', label: '张掖市' },
          { value: '28-8', label: '平凉市' },
          { value: '28-9', label: '酒泉市' },
          { value: '28-10', label: '庆阳市' },
          { value: '28-11', label: '定西市' },
          { value: '28-12', label: '陇南市' },
          { value: '28-13', label: '临夏回族自治州' },
          { value: '28-14', label: '甘南藏族自治州' }
        ]
      },
      {
        value: '29',
        label: '青海省',
        children: [
          { value: '29-1', label: '西宁市' },
          { value: '29-2', label: '海东市' },
          { value: '29-3', label: '海北藏族自治州' },
          { value: '29-4', label: '黄南藏族自治州' },
          { value: '29-5', label: '海南藏族自治州' },
          { value: '29-6', label: '果洛藏族自治州' },
          { value: '29-7', label: '玉树藏族自治州' },
          { value: '29-8', label: '海西蒙古族藏族自治州' }
        ]
      },
      {
        value: '30',
        label: '宁夏回族自治区',
        children: [
          { value: '30-1', label: '银川市' },
          { value: '30-2', label: '石嘴山市' },
          { value: '30-3', label: '吴忠市' },
          { value: '30-4', label: '固原市' },
          { value: '30-5', label: '中卫市' }
        ]
      },
      {
        value: '31',
        label: '新疆维吾尔自治区',
        children: [
          { value: '31-1', label: '乌鲁木齐市' },
          { value: '31-2', label: '克拉玛依市' },
          { value: '31-3', label: '吐鲁番市' },
          { value: '31-4', label: '哈密市' },
          { value: '31-5', label: '昌吉回族自治州' },
          { value: '31-6', label: '博尔塔拉蒙古自治州' },
          { value: '31-7', label: '巴音郭楞蒙古自治州' },
          { value: '31-8', label: '阿克苏地区' },
          { value: '31-9', label: '克孜勒苏柯尔克孜自治州' },
          { value: '31-10', label: '喀什地区' },
          { value: '31-11', label: '和田地区' },
          { value: '31-12', label: '伊犁哈萨克自治州' },
          { value: '31-13', label: '塔城地区' },
          { value: '31-14', label: '阿勒泰地区' },
          { value: '31-15', label: '石河子市' },
          { value: '31-16', label: '阿拉尔市' },
          { value: '31-17', label: '图木舒克市' },
          { value: '31-18', label: '五家渠市' },
          { value: '31-19', label: '铁门关市' }
        ]
      },
      {
        value: '32',
        label: '香港特别行政区',
        children: [
          {
            value: '32-1',
            label: '香港特别行政区'
          }
        ]
      },
      {
        value: '33',
        label: '澳门特别行政区',
        children: [
          {
            value: '33-1',
            label: '澳门特别行政区'
          }
        ]
      },
      {
        value: '34',
        label: '台湾省',
        children: [
          { value: '34-1', label: '台北市' },
          { value: '34-2', label: '高雄市' },
          { value: '34-3', label: '台南市' },
          { value: '34-4', label: '台中市' },
          { value: '34-5', label: '金门县' },
          { value: '34-6', label: '南投县' },
          { value: '34-7', label: '基隆市' },
          { value: '34-8', label: '新竹市' },
          { value: '34-9', label: '嘉义市' },
          { value: '34-10', label: '新北市' },
          { value: '34-11', label: '宜兰县' },
          { value: '34-12', label: '新竹县' },
          { value: '34-13', label: '桃园市' },
          { value: '34-14', label: '苗栗县' },
          { value: '34-15', label: '彰化县' },
          { value: '34-16', label: '嘉义县' },
          { value: '34-17', label: '云林县' },
          { value: '34-18', label: '屏东县' },
          { value: '34-19', label: '台东县' },
          { value: '34-20', label: '花莲县' },
          { value: '34-21', label: '澎湖县' }
        ]
      }
    ]);
    const selectedProvince = ref('');
    const selectedCity = ref('');
    const cities = ref([]);
    const detailAddress = ref('');  // 用于存储具体地址输入

    const updateCities = () => {
      const selected = provinceAndCityOption.value.find(p => p.value === selectedProvince.value);
      cities.value = selected && selected.children ? selected.children : [];
      selectedCity.value = ''; // 重置城市选择
    };
    const handleAddressInput = (event) => {
      console.log('当前输入的详细地址:', event.target.value);

    };

    const goBack = () => {
      router.back(); // 使用Vue Router的back方法返回上一页
    };


    const goNextPage = () => {
      // 组装要发送的数据
      const formData = {
        province: selectedProvince.value,
        city: selectedCity.value,
        address: detailAddress.value
      };
      console.log(formData);

      // 使用路由跳转到下一个页面并传递数据
      router.push({
        name: 'Select',
        params: {
          provinceId: selectedProvince.value,
          cityId: selectedCity.value,
          address: detailAddress.value,
        }
      });

    };



    return {
      cities,
      provinceAndCityOption,
      selectedProvince,
      selectedCity,
      detailAddress,
      updateCities,
      goNextPage,
      handleAddressInput,
      announcements,
      goBack
    };
  }
};
</script>

<style>


.header {
  width: 100%;
  background-color: #0a8b8f;
  color: #ffffff; /* 白色文字 */
  padding: 10px 0;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-family: 'SimSun', '宋体', sans-serif;


}

.back {
  position: absolute;
  font-size: 15px;
  font-weight: bold;
  left: 15px;
  margin-top: 4px;
  cursor: pointer;

}






.card-container {
  background-color: #fff; /* 白色背景 */
  border: 1px solid #0a8b8f; /* 灰色边框 */
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* 轻微的阴影 */
  padding: 5px; /* 内边距 */
  margin: 15px auto; /* 增大外边距并使其居中 */
  width: 90%; /* 缩小卡片宽度 */
  max-width: 300px; /* 减小最大宽度 */
  box-sizing: border-box; /* 盒模型 */
  font-family: 'SimSun', '宋体', sans-serif;
}




.image-container img {
  width: 100%; /* 图片宽度自适应 */
  height: auto; /* 高度自动 */
}



@media (max-width: 600px) {
  .image-container {
    width: 100%;
    height: 200px; /* 移动端适配高度 */
  }
}

h1, h2, p {
  margin: 0;
  padding: 0;
}
.selection-area .select-group, .selection-area .input-group {
  display: flex;
  width: 80%; /* 确保宽度一致 */
  align-items: center; /* 确保垂直居中 */
  margin-top: 30px; /* 设置合适的顶部间距 */
  margin-bottom: -10px;
  padding-left: 40px; /* 维持左侧边距，确保左对齐 */
}

.select-group label, .input-group label {
  margin-right: -5px; /* 适当间距确保视觉清晰 */
  width: 85px; /* 维持所有标签宽度一致 */
  text-align: left; /* 标签文本左对齐 */
  font-weight: bold;

}

.select-group select, .input-group input {
  flex-grow: 1; /* 输入和选择框填充剩余空间 */
  padding: 8px 12px; /* 增加填充以改善可用性 */
  width: calc(100% - 115px); /* 减去标签和间距的宽度，保持控件宽度一致 */
  z-index: 1000;/*定位元素提高文档流层级防止被遮盖*/
  border-radius: 10px; /* 圆角 */
  border: 2px solid #0a8b8f; /* 修改边框颜色为蓝色 */
}
.selection-area button {
  margin-top: 40px; /* 适当的上边距 */
  margin-bottom: 15px;
  padding: 10px 20px; /* 按钮大小 */
  background-color: #0a8b8f; /* 按钮颜色 */
  color: white; /* 文字颜色 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标指针为手型 */
  margin-left: 105px;
  font-family: 'SimSun', '宋体', sans-serif;
}


.announcement {
  margin: 0px auto;
  width: 100%; /* 设置为全宽 */
  overflow: hidden;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #0a8a8e;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-family: 'SimSun', '宋体', sans-serif;
  color: white;
  font-size: 13px;
}

.announcement-content {
  white-space: nowrap; /* 确保公告在一行显示，不折行 */
  display: flex;
  animation: scrollRightToLeft 15s linear infinite;
}

@keyframes scrollRightToLeft {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.announcement-content span {
  padding-right: 50px; /* 在公告之间增加间隔 */
}








</style>
