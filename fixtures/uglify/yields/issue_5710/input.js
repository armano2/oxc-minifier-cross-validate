(async function*() {
    try {
        switch (42) {
          case 42:
            {
                if (console.log("PASS"))
                    return;
                return null;
            }
            break;
        }
    } finally {}
})().next();
