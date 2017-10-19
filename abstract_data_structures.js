// 1. Describe
// Hashing adalah metode untuk menyimpan data secara efektif dengan menyederhanakan data tersebut, yang kemudian disimpan kedalam sebuah multidimensional array of object
// Hashing sebisa mungkin meminimalisir data yang kembar, bukan menghilangkan, karena jika kita menghilangkan data kembar, ukuran panjang data yang kita simpan bisa sangat besar
// ------------
// 2. Implement

// const Benchmark = require('benchmark')
// var suite = new Benchmark.Suite;

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
    // pencarian dengan menggunakan cek satu per satu
    // for (var i = 0; i < this.buckets.length; i++)
    // {
    //   if (node.getIndex() === this.buckets[i].getValue())
    //   {
    //     return this.buckets[i].get(node);
    //   }
    // }
    // return 0;

      let start = 0;
      let end = this.buckets.length - 1;
      let mid = Math.floor((start + end) / 2);
      while (true)
      {
        debugger
        if (node.getIndex() === this.buckets[mid].getValue())
        {
          return this.buckets[mid].get(node);
        }
        else if (node.getIndex() < this.buckets[mid].getValue())
        {
          end = mid - 1;
        }
        else if (node.getIndex() > this.buckets[mid].getValue())
        {
          start = mid + 1;
        }
        else
        {
            return -1;
        }
        mid = Math.floor((start + end) / 2);
      }
      return 0;
  }

  sort()
  {
    let temp;
    for (let i = 0; i < 30; i++)
    {
      while (i >= 0 && this.buckets[i].getValue() > this.buckets[i + 1].getValue())
      {
        temp = this.buckets[i];
        this.buckets[i] = this.buckets[i + 1];
        this.buckets[i + 1] = temp;
        i--;
      }
    }
  }

  print(end)
  {
    for (var i = 0; i < end; i++)
    {
      console.log(this.buckets[i].getValue());
    }
  }
}

// ------------
// 3. Get real


function main() {

  sort_from_file('./wordlist/random_wordlist.txt')
  // sort_from_file('./wordlist/reversed_wordlist.txt')
  // sort_from_file('./wordlist/sorted_wordlist.txt')
  return 0;
}

function sort_from_file(filename) {
  let fs = require('fs')
  let hashObject = new Hash();

  fs.readFile(filename, (err, data) => {

    if (err)
      return console.log(err)

    let items = data.toString().split("\r\n")

    console.log(filename)
    console.log("--------")
    console.log(items.length);
    // console.log(heapSort(items))

    for (var i = 0; i < data.length; i++)
    {
      hashObject.add(new Node(`${items[i]}`));
    }
    let word = new Node("undefined");
    hashObject.sort();
    hashObject.print(30)
  })

}

main()



// suite.add('hash', function()
// {
//   main()
// })
// .on('cycle', function(event)
// {
//   console.log(event.target.toString());
// })
// .on('complete', function()
// {
//   console.log("fastest is " + this.filter('fastest').map('name'));
// })
//
// .run({'async' : true})
