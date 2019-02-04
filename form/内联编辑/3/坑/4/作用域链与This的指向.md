https://www.cnblogs.com/sspeng/p/6633204.html



1. *作用域链取决于函数声明的位置*，函数声明之后，从函数内部往外，一直到window，这就是它的作用域链，与函数调用位置无关；
2. this指向函数调用时的对象，**如果是独立调用，那就是指向window**，与函数声明的位置无关；



**函数调用的方式有4种，this也就有4种指向**：

1. **独立调用**：func()，函数独立调用，this指向window，;
2. 方法调用：obj.func()，函数作为obj的一个方法（属性）调用，this指向obj；
3. 构造函数调用：new Func()，如果在一个函数前面带上 new 关键字来调用， 那么背地里将会创建一个连接到该函数的 prototype 的新对象，this指向这个新的对象；
4. call、apply、bind调用：func.call(obj,value1,value2);  func.apply(obj,[value1,value2])； func.bind(obj,value1,value2)();  func.bind(obj)(value1,value2); 动态改变this的指向obj；

