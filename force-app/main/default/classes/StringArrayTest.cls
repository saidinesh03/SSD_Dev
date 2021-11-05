public class StringArrayTest
{
public integer n;
public list<String> TestString = generateStringArray(10);
public static list<String> generateStringArray(integer b){
list<String> Tests ;
for(integer i=0;i<b;i++)
{
Tests.add('Test '+i);
}
return Tests;

}
}