/**
 * Created by hzp on 2016/7/18.
 */
function Map() {
    this.elements = new Array();

    //鑾峰彇MAP鍏冪礌涓暟
    this.size = function() {
        return this.elements.length;
    }

    //鍒ゆ柇MAP鏄惁涓虹┖
    this.isEmpty = function() {
        return(this.elements.length < 1);
    }

    //鍒犻櫎MAP鎵�鏈夊厓绱�
    this.clear = function() {
        this.elements = new Array();
    }

    //鍚慚AP涓鍔犲厓绱狅紙key, value)
    this.put = function(_key, _value) {
        this.elements.push( {
            key : _key,
            value : _value
        });
    }

    //鍒犻櫎鎸囧畾KEY鐨勫厓绱狅紝鎴愬姛杩斿洖True锛屽け璐ヨ繑鍥濬alse
    this.remove = function(_key) {
        var bln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //鑾峰彇鎸囧畾KEY鐨勫厓绱犲�糣ALUE锛屽け璐ヨ繑鍥濶ULL
    this.get = function(_key) {
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch(e) {
            return null;
        }
    }

    //鑾峰彇鎸囧畾绱㈠紩鐨勫厓绱狅紙浣跨敤element.key锛宔lement.value鑾峰彇KEY鍜孷ALUE锛夛紝澶辫触杩斿洖NULL
    this.element = function(_index) {
        if(_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    }

    //鍒ゆ柇MAP涓槸鍚﹀惈鏈夋寚瀹欿EY鐨勫厓绱�
    this.containsKey = function(_key) {
        varbln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //鍒ゆ柇MAP涓槸鍚﹀惈鏈夋寚瀹歏ALUE鐨勫厓绱�
    this.containsValue = function(_value) {
        var bln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //鑾峰彇MAP涓墍鏈塚ALUE鐨勬暟缁勶紙ARRAY锛�
    this.values = function() {
        var arr = new Array();
        for(i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    }

    //鑾峰彇MAP涓墍鏈塊EY鐨勬暟缁勶紙ARRAY锛�
    this.keys = function() {
        var arr = new Array();
        for(i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    }
}
