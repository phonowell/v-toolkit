(function() {
  module.exports = function(cont) {
    var date, string;
    if (!cont) {
      return cont;
    }
    date = new Date();
    string = [date.getFullYear(), 1 + date.getMonth(), date.getDate()].join('/');
    // return
    return [...cont, `**本章节内容最后更新于\`${string}\`。**`, ''];
  };

}).call(this);
