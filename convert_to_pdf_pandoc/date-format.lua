    -- filters/date-format.lua
    function Meta(meta)
      if meta.date then
        local format = "(%d+)-(%d+)-(%d+)" -- Assuming date is in YYYY-MM-DD format in frontmatter
        local y, m, d = pandoc.utils.stringify(meta.date):match(format)
        if y and m and d then
          local date = os.time({ year = y, month = m, day = d })
          -- Change the format string below to your desired output format
          local date_string = os.date("%d %b %Y", date) -- Example: 02 Apr 2018
          meta.date = pandoc.Str(date_string)
        end
      end
      return meta
    end