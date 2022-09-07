function luckyzDraw(player: string) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }
  
  async function getResults() {
    try {
      const res1 = await luckyzDraw("Edoardo");
      const res2 = await luckyzDraw("Marco");
      const res3 = await luckyzDraw("Giovanni");
    } catch (err:any) {
      console.error(err.message);
    }
  }
  
  getResults();