// 1. Describe
// Hashing adalah metode untuk menyimpan data secara efektif dengan menyederhanakan data tersebut, yang kemudian disimpan kedalam sebuah multidimensional array of object
// Hashing sebisa mungkin meminimalisir data yang kembar, bukan menghilangkan, karena jika kita menghilangkan data kembar, ukuran panjang data yang kita simpan bisa sangat besar
// ------------
// 2. Implement

class Node
{
  //untuk menyimpan nilai
  constructor(word)
  {
    this.index = this.countValue(word.toLowerCase());
    this.word = word;
  }

  countValue (word)
  {
    let result = 0;
    let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", "r", "s","t", "u", "v", "w", "x", "y", "z"];
    for (let i = 0; i < word.length; i++)
    {
      result += letters.indexOf(word[i].toLowerCase()) + 1;
    }
    return result;
  }

  getWord()
  {
    return this.word.toLowerCase();
  }

  getIndex()
  {
    return this.index;
  }
}

class Bucket
{
  constructor(value)
  {
    this.value = value;
    this.isi = []
  }

  add(node)
  {
    this.isi.push(node);
  }

  get(node)
  {
    debugger
    for (var i = 0; i < this.isi.length; i++)
    {
      if (node.getWord() === this.isi[i].getWord())
      {
        return this.isi[i];
      }
    }
    return 0;
  }

  getValue()
  {
    return this.value;
  }
}


class Hash
{
  constructor()
  {
    this.buckets = [];
  }

  add(node)
  {
    if (this.buckets.length === 0)
    {
      this.buckets.push(new Bucket(node.getIndex()));
      this.buckets[0].add(node);
    }
    else
    {
      let add = false;
      for (var i = 0; i < this.buckets.length; i++)
      {
        if (this.buckets[i].getValue() === node.getIndex())
        {
          this.buckets[i].add(node);
          add = true;
        }
      }
      if (!add)
      {
        this.buckets.push(new Bucket(node.getIndex()));
        this.buckets[i].add(node);
      }
    }
  }

  get(node)
  {
    debugger
    for (var i = 0; i < this.buckets.length; i++)
    {
      if (node.getIndex() === this.buckets[i].getValue())
      {
        return this.buckets[i].get(node);
      }
    }
    return 0;
  }

}




let word = new Node("AAB");
let word2 = new Node("AAAA");
let word3 = new Node("BB");
let word4 = new Node("C");

let hashtables = new Hash();

hashtables.add(word);
hashtables.add(word2);
hashtables.add(word3);
hashtables.add(word4);


let word5 = new Node("Rizky")
// console.log(hashtables.get(word5));
console.log(hashtables.get(word3));
// ------------
// 3. Get real
