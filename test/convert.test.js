const convert = require('../src/convert')
const expect = require('chai').expect;

describe('中文转拼音或者首字母工具测试', function () {

    describe('根据result值不同获取不同的结果', function () {

        it('result值P，输出结果为拼音合集', function () {

            expect(convert({
                cn: '中文转拼音或首字母',
                result: 'P',
            })).to.be.equal('ZhongWenZhuanPinYinHuoShouZiMu');

        });


        it('result值F，输出结果为首字母合集', function () {

            expect(convert({
                cn: '中文转拼音或首字母',
                result: 'F',
            })).to.be.equal('ZWZPYHSZM');

        });


        it('result值A，输出结果为包含两个key(pinyin和first)的对象', function () {

            expect(convert({
                cn: '中文转拼音或首字母',
                result: 'A',
            })).to.have.property('pinyin').to.be.equal('ZhongWenZhuanPinYinHuoShouZiMu');

            expect(convert({
                cn: '中文转拼音或首字母',
                result: 'A',
            })).to.have.property('first').to.be.equal('ZWZPYHSZM');
        });

    });


    it('result=P，输入字符串长度小于threshold时应该输出拼音合集，否则输出首字母合集', function () {
        expect(convert({
            cn: '中文转拼音或首字母',
            result: 'P',
            threshold: 5
        })).to.be.equal('ZWZPYHSZM');

        expect(convert({
            cn: '中文转拼音或首字母',
            result: 'P',
            threshold: 9
        })).to.be.equal('ZhongWenZhuanPinYinHuoShouZiMu');
    });


    it('concatKey值不为undefined，拼音合集之间应该以concatKey连接', function () {
        expect(convert({
            cn: '中文转拼音或首字母',
            result: 'P',
            concatKey: '_'
        })).to.be.equal('Zhong_Wen_Zhuan_Pin_Yin_Huo_Shou_Zi_Mu');

        expect(convert({
            cn: '中文转拼音或首字母',
            result: 'A',
            concatKey: '_'
        })).to.have.property('pinyin').to.be.equal('Zhong_Wen_Zhuan_Pin_Yin_Huo_Shou_Zi_Mu');

    });


    it('double值为true,翘舌音（zh、ch、sh）返回全部生母，否则返回首字母', function () {

        expect(convert({
            cn: '中文转拼音或首字母',
            result: 'F',
            double: true
        })).to.be.equal('ZHWZHPYHSHZM');

        expect(convert({
            cn: '中文转拼音或首字母',
            result: 'F',
        })).to.be.equal('ZWZPYHSZM');

        expect(convert({
            cn: '中文转拼音或首字母',
            result: 'A',
            double: true
        })).to.have.property('first').to.be.equal('ZHWZHPYHSHZM');

    });

    it('remainSpecial值为true时,输入的中文字符串中有特殊字符原封不动的输出，默认去除特殊字符', function () {

        expect(convert({
            cn: '中文-转-拼音或_首字母',
            result: 'F',
        })).to.be.equal('ZWZPYHSZM');

        expect(convert({
            cn: '中文-转-拼音或_首字母',
            result: 'F',
            remainSpecial: true
        })).to.be.equal('ZW-Z-PYH_SZM');

    })

});