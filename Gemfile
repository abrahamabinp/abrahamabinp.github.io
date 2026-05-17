source "https://rubygems.org"

# Jekyll for static site generation
gem "jekyll", "~> 4.3.0"


# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
end

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
